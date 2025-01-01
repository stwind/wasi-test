import { describe, expect, test } from 'bun:test';
import { readFileSync } from "node:fs";

const instantiate = async <T,>(bin: Buffer, imports: WebAssembly.Imports) => {
  const { instance } = await WebAssembly.instantiate(bin, imports);
  return instance.exports as unknown as T;
};

const mod = await instantiate<{
  memory: WebAssembly.Memory;
  add(a: number, b: number): number;
}>(readFileSync("./main.wasm"), {
  env: {
    memory: new WebAssembly.Memory({ initial: 10 }),
  },
  wasi_snapshot_preview1: {
    random_get: Math.random
  }
});

describe("wasm", () => {
  test("foo", () => expect(mod.add(3, 4)).toBe(7));
});