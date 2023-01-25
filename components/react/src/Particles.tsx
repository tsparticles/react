import React, { Component, ReactNode } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import equal from "fast-deep-equal/react";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { tsParticles } from "@tsparticles/engine";

const defaultId = "tsparticles";

/**
 * @param {{id?: string,options?: ISourceOptions,url?: string,particlesInit?: (tsParticles: Engine) => Promise<void>,particlesLoaded?: (container: Container) => Promise<void>
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
    static defaultProps: IParticlesProps = {
        options: {},
        url: undefined,
        id: defaultId,
    };

    constructor(props: IParticlesProps) {
        super(props);

        this.state = {
            init: false,
            library: undefined,
        };
    }

    destroy(): void {
        if (!this.state.library) {
            return;
        }

        this.state.library.destroy();

        this.setState({
            library: undefined,
        });
    }

    shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !equal(nextProps, this.props);
    }

    componentDidUpdate(): void {
        this.refresh();
    }

    forceUpdate(): void {
        this.refresh().then(() => {
            super.forceUpdate();
        });
    }

    componentDidMount(): void {
        (async () => {
            if (this.props.particlesInit) {
                await this.props.particlesInit(tsParticles);
            }

            this.setState(
                {
                    init: true,
                },
                async () => {
                    await this.loadParticles();
                }
            );
        })();
    }

    componentWillUnmount(): void {
        this.destroy();
    }

    render(): ReactNode {
        const { id } = this.props;

        return (
            <div id={id}>
                <canvas />
            </div>
        );
    }

    private async refresh(): Promise<void> {
        this.destroy();

        await this.loadParticles();
    }

    private async loadParticles(): Promise<void> {
        if (!this.state.init) {
            return;
        }

        const cb = async (container?: Container) => {
            this.setState({
                library: container,
            });

            if (this.props.particlesLoaded) {
                await this.props.particlesLoaded(container);
            }
        };

        const id = this.props.id ?? Particles.defaultProps.id ?? defaultId,
            container = await tsParticles.load(
                this.props.url
                    ? {
                          id,
                          url: this.props.url,
                      }
                    : {
                          id,
                          options: this.props.options,
                      }
            );

        await cb(container);
    }
}
