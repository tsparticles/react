# React ParticlesProvider Pattern

## Overview

The `ParticlesProvider` is a React Context-based solution for initializing the tsParticles engine **once at the application level** instead of repeatedly in each `<Particles>` component.

### Benefits
- **Performance**: Engine initialization happens once; all components reuse it
- **Memory efficiency**: Plugins are loaded once and shared across all instances
- **Cleaner code**: Separation of concerns (init logic vs. component logic)
- **Backward compatible**: Components still work without the provider (inline init)

## Usage

### Basic Setup

Wrap your app (or relevant subtree) with `ParticlesProvider`:

```tsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "@tsparticles/presets";

function App() {
  return (
    <ParticlesProvider
      particlesInit={async (engine) => {
        // Load all presets/plugins you need
        await loadFull(engine);
      }}
    >
      <YourAppContent />
    </ParticlesProvider>
  );
}
```

### Using the Hook in Components

Once under the provider, components can access the ready engine state:

```tsx
import { Particles, useParticlesEngine } from "@tsparticles/react";
import type { IParticlesProps } from "@tsparticles/react";

function MyParticles() {
  const { engine, isReady, error } = useParticlesEngine();

  if (!isReady && !error) {
    return <div>Initializing particles...</div>;
  }

  if (error) {
    return <div>Failed to initialize: {error.message}</div>;
  }

  const particlesOptions: IParticlesProps["options"] = {
    // Your particle configuration
  };

  return (
    <Particles
      id="my-particles"
      options={particlesOptions}
      particlesLoaded={async (container) => {
        console.log("Particles loaded:", container);
      }}
    />
  );
}
```

## Advanced Patterns

### Multiple Providers (if needed)

You can nest providers for fine-grained control:

```tsx
<ParticlesProvider particlesInit={initForMain}>
  <MainSection />
  <ParticlesProvider particlesInit={initForAside}>
    <AsideSection />
  </ParticlesProvider>
</ParticlesProvider>
```

### Without Provider (Backward Compatibility)

Components still work standalone with `particlesInit` callback:

```tsx
<Particles
  options={config}
  particlesInit={async (engine) => {
    await loadFull(engine);
  }}
/>
```

In this case, the component initializes the engine inline (no provider needed).

## TypeScript

Full type support for engine, options, and callbacks:

```tsx
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { Particles, useParticlesEngine } from "@tsparticles/react";

const MyComponent: React.FC = () => {
  const { engine, isReady } = useParticlesEngine();

  const handleParticlesLoaded = async (container: Container): Promise<void> => {
    console.log("Container ready", container);
  };

  const options: ISourceOptions = {
    // typed options
  };

  return (
    <Particles
      id="app-particles"
      options={options}
      particlesLoaded={handleParticlesLoaded}
    />
  );
};
```

## Context Fallback

If `useParticlesEngine()` is called outside a provider, it throws a clear error:

```
Error: useParticlesEngine must be used within ParticlesProvider
```

To avoid this, either:
1. Use the provider at the root
2. Wrap your consumer component tree with `<ParticlesProvider>`
3. Use standalone `<Particles>` with `particlesInit` callback (no hook needed)
