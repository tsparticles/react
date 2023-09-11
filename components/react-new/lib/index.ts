import { Engine, tsParticles } from "@tsparticles/engine";
import Particles from "./Particles";
import { useEffect, useState } from "react";

export type {
  IParticlesProps,
  IParticlesProps as ParticlesProps,
} from "./IParticlesProps";

export function useParticlesPlugins(cb: (engine: Engine) => Promise<void>): {
  done: boolean;
  error: boolean;
} {
  const [init, setInit] = useState(false),
    [done, setDone] = useState(false),
    [error, setError] = useState(false);

  console.log(init, done, error);

  useEffect(() => {
    if (init || done || error) {
      return;
    }

    setInit(true);

    cb(tsParticles)
      .then(() => setDone(true))
      .catch(() => setError(true));
  }, [init, done, error, cb]);

  return { done, error };
}

export default Particles;
export { Particles };
