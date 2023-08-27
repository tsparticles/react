import { Engine, tsParticles } from "@tsparticles/engine";
import Particles from "./Particles";
import { useState } from "react";

export type { IParticlesProps, IParticlesProps as ParticlesProps } from "./IParticlesProps";
export type { IParticlesState, IParticlesState as ParticlesState } from "./IParticlesState";

export function useParticlesPlugins(cb: (engine: Engine) => Promise<void>): { done: boolean; error: boolean } {
    const [done, setDone] = useState(false);
    const [error, setError] = useState<boolean>(false);

    cb(tsParticles)
        .then(() => setDone(true))
        .catch(() => setError(true));

    return { done, error };
}

export default Particles;
export { Particles };
