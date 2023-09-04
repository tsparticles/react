import React, { useEffect } from "react";
import type { IParticlesProps } from "./IParticlesProps";
import { tsParticles, type Container } from "@tsparticles/engine";

function Particles(props: IParticlesProps): JSX.Element {
    const id = props.id ?? "tsparticles";
    const [container, setContainer] = React.useState<Container | undefined>(undefined);

    useEffect(() => {
        tsParticles.load({ id, url: props.url, options: props.options }).then(c => {
            setContainer(c);

            props.particlesLoaded?.(c);
        });

        return () => {
            container?.destroy();
        };
    }, []);

    return <div id={id} className={props.className}></div>;
}

export default Particles;
