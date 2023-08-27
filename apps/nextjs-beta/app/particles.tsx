"use client";

import Particles, { useParticlesPlugins } from "@tsparticles/react";
import configs from "@tsparticles/configs";
import { useState, useEffect } from "react";
import { loadFull } from "tsparticles";
import { isSsr } from "@tsparticles/engine";

export default function ParticlesComponent(props: { id: string }) {
  const [init, setInit] = useState(false);

  const { done, error } = useParticlesPlugins(async (engine) => {
    await loadFull(engine);
  });

  if (isSsr() || error || !done) {
    return <></>;
  }

  if (!init) {
    setInit(done);
  }

  return init && <Particles id={props.id} options={configs.basic} />;
}
