import { Engine, tsParticles } from "@tsparticles/engine";
import Particles from "./Particles";
import { useEffect, useState } from "react";

export type { IParticlesProps, IParticlesProps as ParticlesProps } from "./IParticlesProps";

export function useParticlesPlugins(cb: (engine: Engine) => Promise<void>): { done: boolean; error: boolean } {
    const [done, setDone] = useState(false),
        [error, setError] = useState(false);

    useEffect(() => {
        cb(tsParticles)
            .then(() => setDone(true))
            .catch(() => setError(true));
    }, [cb]);

    return { done, error };
}

export default Particles;
export { Particles };
