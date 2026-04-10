import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import type { CSSProperties } from "react";

export type ParticlesEngineInit = (engine: Engine) => Promise<void> | void;
export type ParticlesLoaded = (container?: Container) => Promise<void> | void;

export interface IParticlesProps {
  id?: string;
  options?: ISourceOptions;
  url?: string;
  style?: CSSProperties;
  className?: string;
  particlesInit?: ParticlesEngineInit;
  particlesLoaded?: ParticlesLoaded;
}
