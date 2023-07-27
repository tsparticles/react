import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback, useMemo, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const containerRef = useRef(null);

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback((container) => {
        containerRef.current = container;

        window.particlesContainer = container;
    }, [containerRef]);

    const options = useMemo(() => ({
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
    }), []);

    const lightTheme = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        console.log(containerRef.current);

        setTimeout(() => {
            containerRef.current.loadTheme("light");
        }, 500);
    }, [containerRef]);

    const darkTheme = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        console.log(containerRef.current);

        setTimeout(() => {
            containerRef.current.loadTheme("dark");
        }, 500);
    }, [containerRef]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
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
                <button className="theme-btn" onClick={lightTheme}>Light</button>
                <button className="theme-btn" onClick={darkTheme}>Dark</button>
            </header>
            <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} />
        </div>
    );
}

export default App;
