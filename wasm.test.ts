import { describe, expect, test } from 'bun:test';
import { readFileSync } from "node:fs";

const instantiate = async <T,>(bin: Buffer, env: WebAssembly.ModuleImports) => {
  const { instance } = await WebAssembly.instantiate(bin, { env });
  return instance.exports as unknown as T;
};

const mod = await instantiate<{
  memory: WebAssembly.Memory;
  add(a: number, b: number): number;
}>(readFileSync("./main.wasm"), {
  memory: new WebAssembly.Memory({ initial: 10 }),
});

describe("wasm", () => {
  test("foo", () => expect(mod.add(3, 4)).toBe(7));
});