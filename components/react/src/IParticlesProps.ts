import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export interface IParticlesProps {
    id?: string;
    options?: ISourceOptions;
    url?: string;
    particlesInit?: (engine: Engine) => Promise<void>;
    particlesLoaded?: (container?: Container) => Promise<void>;
}
