import { Engine, tsParticles } from "@tsparticles/engine";
import Particles from "./Particles";

export type { IParticlesProps, IParticlesProps as ParticlesProps } from "./IParticlesProps";
export type { IParticlesState, IParticlesState as ParticlesState } from "./IParticlesState";

export async function useParticlesPlugins(cb: (engine: Engine) => Promise<void>): Promise<void> {
    cb(tsParticles);
}

export default Particles;
export { Particles };
