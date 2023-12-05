import { Engine, tsParticles } from "@tsparticles/engine";
import Particles from "./Particles";

export type {
    IParticlesProps,
    IParticlesProps as ParticlesProps,
} from "./IParticlesProps";

export async function initParticlesEngine(cb: (engine: Engine) => Promise<void>): Promise<void> {
    await cb(tsParticles)
}

export default Particles;
export { Particles };
