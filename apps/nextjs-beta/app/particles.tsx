"use client";

import Particles from "@tsparticles/react";
import configs from "@tsparticles/configs";

export default function ParticlesComponent(props: {
  id: string;
  done: boolean;
}) {
  console.log(props.done);

  return props.done && <Particles id={props.id} options={configs.basic} />;
}
