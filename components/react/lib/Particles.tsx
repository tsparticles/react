import { FC, useEffect } from "react";
import type { IParticlesProps } from "./IParticlesProps";
import type { Container } from "@tsparticles/engine";

const Particles: FC<IParticlesProps> = (props) => {
  const id = props.id ?? "tsparticles";

  useEffect(() => {
    let container: Container | undefined;

    void (async () => {
      const { tsParticles } = await import("@tsparticles/engine");

      tsParticles
        .load({ id, url: props.url, options: props.options })
        .then((c) => {
          container = c;

          props.particlesLoaded?.(c);
        });
    })();

    return () => {
      container?.destroy();
    };
  }, [id, props, props.url, props.options]);

  return <div id={id} className={props.className}></div>;
};

export default Particles;
