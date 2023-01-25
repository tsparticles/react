import type { RefObject } from "react";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";
import type { CSSProperties } from "react";

export interface IParticlesProps {
    id?: string;
    options?: ISourceOptions;
    params?: ISourceOptions;
    url?: string;
    className?: string;
    canvasClassName?: string;
    init?: (engine: Engine) => Promise<void>;
    loaded?: (container?: Container) => Promise<void>;
}
