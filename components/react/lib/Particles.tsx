import type { Container, Engine } from "@tsparticles/engine";
import { useEffect, useRef } from "react";

import type { IParticlesProps } from "./IParticlesProps";
import { useParticlesEngine } from "./ParticlesProvider";

const Particles = ({
  id: idProp,
  url,
  options,
  className,
  style,
  particlesInit,
  particlesLoaded,
}: IParticlesProps) => {
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
      try {
        const { tsParticles } = await import("@tsparticles/engine");
        const engine = contextEngine ?? tsParticles;

        // If no context engine and particlesInit provided, initialize inline
        if (!contextEngine && particlesInit) {
          await particlesInit(engine);
        }

        const container = await tsParticles.load({ id, options, url });

        if (unmounted) {
          container?.destroy();

          return;
        }

        containerRef.current = container;

        await particlesLoaded?.(container);
      } catch (error) {
        console.error("Failed to load particles instance:", error);
      }
    })();

    return () => {
      unmounted = true;

      containerRef.current?.destroy();
      containerRef.current = undefined;
    };
  }, [id, options, particlesInit, particlesLoaded, url, contextEngine]);

  // Width/height are supported through style passthrough (CSSProperties)
  return <div id={id} className={className} style={style} />;
};

export default Particles;
