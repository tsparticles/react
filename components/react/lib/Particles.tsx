import type { Container, Engine } from "@tsparticles/engine";
import { FC, useEffect, useRef } from "react";

import type { IParticlesProps } from "./IParticlesProps";
import { useParticlesEngine } from "./ParticlesProvider";

const Particles: FC<IParticlesProps> = ({
  id: idProp,
  url,
  options,
  className,
  style,
  particlesInit,
  particlesLoaded,
}) => {
  const id = idProp ?? "tsparticles";
  const containerRef = useRef<Container | undefined>(undefined);

  // Try to get engine from context (if provider is used)
  let contextEngine: Engine | undefined;
  try {
    const { engine } = useParticlesEngine();
    contextEngine = engine;
  } catch {
    // Provider not used, will load engine inline
  }

  useEffect(() => {
    let unmounted = false;

    void (async () => {
      const { tsParticles } = await import("@tsparticles/engine");

      // If no context engine and particlesInit provided, initialize inline
      if (!contextEngine && particlesInit) {
        await particlesInit(tsParticles);
      }

      const container = await tsParticles.load({ id, options, url });

      if (unmounted) {
        container?.destroy();

        return;
      }

      containerRef.current = container;

      await particlesLoaded?.(container);
    })();

    return () => {
      unmounted = true;

      containerRef.current?.destroy();
      containerRef.current = undefined;
    };
  }, [id, options, particlesInit, particlesLoaded, url, contextEngine]);

  return <div id={id} className={className} style={style}></div>;
};

export default Particles;
