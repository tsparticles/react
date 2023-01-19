import * as React from 'react';
import Particles from '@tsparticles/react';
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface IProps {
    options: ISourceOptions;
}

export class ParticlesContainer extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);

        this.particlesInit = this.particlesInit.bind(this);
        this.particlesLoaded = this.particlesLoaded.bind(this);
    }

    async particlesInit(engine: Engine): Promise<void> {
        await loadFull(engine);
    }

    async particlesLoaded(container?: Container): Promise<void> {
        console.log(container);
    }

    render() {
        return <Particles options={this.props.options} className="frame-layout__particles"
                          init={this.particlesInit} loaded={this.particlesLoaded}/>
    }
}
