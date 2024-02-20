import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import './App.css'
import { loadFull } from 'tsparticles';
import type { Container } from '@tsparticles/engine';

function App() {
    const [ particlesInitialized, setParticlesInitialized ] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            if (particlesInitialized) {
                return;
            }

            await loadFull(engine);
        }).then(() => {
            setParticlesInitialized(true);
        })
    }, []);

    const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
        if (!container) {
            return;
        }

        console.log("Particles loaded", container.actualOptions);
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            {particlesInitialized && (
                <Particles options={{
                    background: {
                        color: "#000"
                    },
                    particles: {
                        number: {
                            value: 100
                        },
                        links: {
                            enable: true
                        },
                        move: {
                            enable: true,
                        }
                    }
                }} particlesLoaded={particlesLoaded}/>)}
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
