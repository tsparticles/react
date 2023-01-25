import React, { Component, ReactNode } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import equal from "fast-deep-equal/react";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { tsParticles } from "@tsparticles/engine";

const defaultId = "tsparticles";

/**
 * @param {{id?: string,options?: ISourceOptions,params?: ISourceOptions,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
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
            if (this.props.init) {
                await this.props.init(tsParticles);
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
        const { className, canvasClassName, id } = this.props;

        return (
            <div className={className} id={id}>
                <canvas className={canvasClassName} />
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

            if (this.props.loaded) {
                await this.props.loaded(container);
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
                          options: this.props.params ?? this.props.options,
                      }
            );

        await cb(container);
    }
}
