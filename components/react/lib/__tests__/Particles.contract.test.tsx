import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const loadMock = vi.fn();
const destroyMock = vi.fn();

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    load: loadMock,
  },
}));

vi.mock("../ParticlesProvider", () => ({
  useParticlesEngine: () => {
    throw new Error("useParticlesEngine must be used within ParticlesProvider");
  },
}));

import Particles from "../Particles";

describe("Particles behavioral contract", () => {
  beforeEach(() => {
    destroyMock.mockReset();
    loadMock.mockReset();
    loadMock.mockResolvedValue({ destroy: destroyMock });
  });

  afterEach(() => {
    cleanup();
  });

  it("CORE-01 mounts and triggers engine load", async () => {
    const { container } = render(<Particles />);

    await waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    expect(container.querySelector("#tsparticles")).not.toBeNull();
  });

  it("CORE-02 uses options configuration when provided", async () => {
    const options = { fpsLimit: 60 };

    render(<Particles options={options} />);

    await waitFor(() => {
      expect(loadMock).toHaveBeenCalledWith({
        id: "tsparticles",
        options,
        url: undefined,
      });
    });
  });

  it("CORE-03 uses url configuration when provided", async () => {
    render(<Particles url="/particles.json" />);

    await waitFor(() => {
      expect(loadMock).toHaveBeenCalledWith({
        id: "tsparticles",
        options: undefined,
        url: "/particles.json",
      });
    });
  });

  it("CORE-05 passes id, className, and style to rendered node", async () => {
    const { container } = render(
      <Particles
        id="hero-canvas"
        className="particle-layer"
        style={{ width: "300px", height: "150px" }}
      />,
    );

    await waitFor(() => {
      expect(loadMock).toHaveBeenCalledWith({
        id: "hero-canvas",
        options: undefined,
        url: undefined,
      });
    });

    const node = container.querySelector(
      "#hero-canvas",
    ) as HTMLDivElement | null;

    expect(node).not.toBeNull();
    expect(node?.className).toBe("particle-layer");
    expect(node?.style.width).toBe("300px");
    expect(node?.style.height).toBe("150px");
  });
});
