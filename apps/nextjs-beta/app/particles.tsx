"use client";

import Particles, { useParticlesPlugins } from "@tsparticles/react";
import configs from "@tsparticles/configs";
import { useState, useEffect } from "react";
import { loadFull } from "tsparticles";

export default function ParticlesComponent(props: { id: string }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useParticlesPlugins(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  return <Particles id={props.id} options={configs.basic} />;
}
