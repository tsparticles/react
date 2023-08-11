import React, { Component, MutableRefObject, ReactNode } from "react";
import { tsParticles, type Container } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import { deepCompare } from "./Utils";

const defaultId = "tsparticles";

/**
 * @param {{id?: string,width?: string,height?: string,options?: import("tsparticles-engine").ISourceOptions,params?: import("tsparticles-engine").ISourceOptions,style?: import("react").CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
    static defaultProps: IParticlesProps = {
        width: "100%",
        height: "100%",
        options: {},
        style: {},
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
        const nextOptions = nextProps.options ?? nextProps.params,
            currentOptions = this.props.options ?? this.props.params;

        return (
            nextProps.url !== this.props.url ||
            nextProps.id !== this.props.id ||
            nextProps.canvasClassName !== this.props.canvasClassName ||
            nextProps.className !== this.props.className ||
            nextProps.height !== this.props.height ||
            nextProps.width !== this.props.width ||
            !deepCompare(nextProps.style, this.props.style) ||
            nextProps.init !== this.props.init ||
            nextProps.loaded !== this.props.loaded ||
            !deepCompare(nextOptions, currentOptions, key => key.startsWith("_"))
        );
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
                },
            );
        })();
    }

    componentWillUnmount(): void {
        this.destroy();
    }

    render(): ReactNode {
        const { width, height, className, canvasClassName, id } = this.props;

        return (
            <div className={className} id={id}>
                <canvas
                    className={canvasClassName}
                    style={{
                        ...this.props.style,
                        width,
                        height,
                    }}
                />
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

        const id = this.props.id ?? Particles.defaultProps.id ?? defaultId,
            container = await tsParticles.load({
                url: this.props.url,
                id,
                options: this.props.options ?? this.props.params,
            });

        if (this.props.container) {
            (this.props.container as MutableRefObject<Container | undefined>).current = container;
        }

        this.setState({
            library: container,
        });

        if (this.props.loaded) {
            await this.props.loaded(container);
        }
    }
}
