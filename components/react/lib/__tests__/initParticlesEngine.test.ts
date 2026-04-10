import { describe, expect, it, vi } from "vitest";

const engineRef = { marker: "engine" };

vi.mock("@tsparticles/engine", () => ({
  tsParticles: engineRef,
}));

import { initParticlesEngine } from "../index";

describe("initParticlesEngine", () => {
  it("CORE-04 invokes callback with engine and supports sync callback", async () => {
    const cb = vi.fn((_engine) => {
      return;
    });

    await initParticlesEngine(cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(engineRef);
  });
});
