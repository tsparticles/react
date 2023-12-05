import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const containerRef = useRef(null),
        initParticlesCb = useCallback(async (engine) => {
            await loadFull(engine);
        }, []), [ init, setInit ] = useState(false);

    useEffect(() => {
        initParticlesEngine(initParticlesCb).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(
            (container) => {
                containerRef.current = container;

                window.particlesContainer = container;
            },
            [ containerRef ]
        ),
        options = useMemo(
            () => ({
                fullScreen: {
                    zIndex: -1,
                },
                particles: {
                    number: {
                        value: 100,
                    },
                    links: {
                        enable: true,
                    },
                    move: {
                        enable: true,
                    },
                },
                themes: [
                    {
                        name: "light",
                        default: {
                            value: true,
                            auto: true,
                            mode: "light",
                        },
                        options: {
                            background: {
                                color: "#ffffff",
                            },
                            particles: {
                                color: {
                                    value: "#000000",
                                },
                                links: {
                                    color: "#000000",
                                },
                            },
                        },
                    },
                    {
                        name: "dark",
                        default: {
                            value: true,
                            auto: true,
                            mode: "dark",
                        },
                        options: {
                            background: {
                                color: "#000000",
                            },
                            particles: {
                                color: {
                                    value: "#ffffff",
                                },
                                links: {
                                    color: "#ffffff",
                                },
                            },
                        },
                    },
                ],
            }),
            []
        ),
        lightTheme = useCallback(() => {
            if (!containerRef.current) {
                return;
            }

            console.log(containerRef.current);

            setTimeout(() => {
                containerRef.current.loadTheme("light");
            }, 500);
        }, [ containerRef ]),
        darkTheme = useCallback(() => {
            if (!containerRef.current) {
                return;
            }

            console.log(containerRef.current);

            setTimeout(() => {
                containerRef.current.loadTheme("dark");
            }, 500);
        }, [ containerRef ]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button className="theme-btn" onClick={lightTheme}>
                    Light
                </button>
                <button className="theme-btn" onClick={darkTheme}>
                    Dark
                </button>
            </header>
            {init && (
                <Particles
                    id="tsparticles"
                    loaded={particlesLoaded}
                    options={options}
                />
            )}
        </div>
    );
}

export default App;
