import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import type { CSSProperties } from "react";

export interface IParticlesProps {
  id?: string;
  options?: ISourceOptions;
  url?: string;
  style?: CSSProperties;
  className?: string;
  particlesInit?: (engine: Engine) => Promise<void> | void;
  particlesLoaded?: (container?: Container) => Promise<void> | void;
}
