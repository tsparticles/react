import type {
  IParticlesProps,
  ParticlesEngineInit,
  ParticlesLoaded,
} from "../index";
import { describe, expect, it } from "vitest";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
type Expect<T extends true> = T;

type ParticlesInitType = IParticlesProps["particlesInit"];
type ParticlesLoadedType = IParticlesProps["particlesLoaded"];

type _TYPE01_InitAliasMatches = Expect<
  Equal<ParticlesInitType, ParticlesEngineInit | undefined>
>;

type _TYPE01_LoadedAliasMatches = Expect<
  Equal<ParticlesLoadedType, ParticlesLoaded | undefined>
>;

type _TYPE02_OptionsKeyExists = Expect<
  Equal<"options" extends keyof IParticlesProps ? true : false, true>
>;

const typeChecks: [
  _TYPE01_InitAliasMatches,
  _TYPE01_LoadedAliasMatches,
  _TYPE02_OptionsKeyExists,
] = [true, true, true];

describe("type contracts", () => {
  it("TYPE-01 and TYPE-02 compile-time contracts are preserved", () => {
    expect(typeChecks).toEqual([true, true, true]);
  });
});
