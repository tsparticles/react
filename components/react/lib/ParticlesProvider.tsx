import type { Engine } from "@tsparticles/engine";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ParticlesEngineInit } from "./IParticlesProps";

interface ParticlesContextType {
  engine: Engine | undefined;
  isReady: boolean;
  error: Error | undefined;
}

const ParticlesContext = createContext<ParticlesContextType | undefined>(
  undefined,
);

interface ParticlesProviderProps {
  children: ReactNode;
  particlesInit?: ParticlesEngineInit;
}

/**
 * ParticlesProvider initializes the tsParticles engine once at the application level.
 * All Particles components within this provider will share the same initialized engine,
 * reducing redundant initialization and improving performance.
 *
 * Usage:
 * ```tsx
 * <ParticlesProvider particlesInit={async (engine) => {
 *   await loadFull(engine);
 * }}>
 *   <App />
 * </ParticlesProvider>
 * ```
 */
export const ParticlesProvider = ({
  children,
  particlesInit,
}: ParticlesProviderProps): ReactNode => {
  const [engine, setEngine] = useState<Engine | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    void (async () => {
      try {
        const { tsParticles } = await import("@tsparticles/engine");

        if (particlesInit) {
          await particlesInit(tsParticles);
        }

        if (mounted) {
          setEngine(tsParticles);
          setIsReady(true);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        if (mounted) {
          setError(error);
          setIsReady(true);
        }

        console.error("Failed to initialize particles engine:", error);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [particlesInit]);

  return (
    <ParticlesContext.Provider value={{ engine, isReady, error }}>
      {children}
    </ParticlesContext.Provider>
  );
};

/**
 * Hook to access the shared tsParticles engine from ParticlesProvider.
 * Returns the initialized engine and ready status.
 */
export const useParticlesEngine = () => {
  const context = useContext(ParticlesContext);

  if (context === undefined) {
    throw new Error("useParticlesEngine must be used within ParticlesProvider");
  }

  return context;
};
