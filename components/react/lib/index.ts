import type { Engine } from "@tsparticles/engine";
import Particles from "./Particles";

export type { IParticlesProps } from "./IParticlesProps";

export async function initParticlesEngine(
  cb: (engine: Engine) => Promise<void>,
): Promise<void> {
  const { tsParticles } = await import("@tsparticles/engine");

  await cb(tsParticles);
}

export default Particles;
export { Particles };
