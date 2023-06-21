import { describe, test, expect } from "vitest";
import { defineConstants } from "../composables/defineConstants";

describe("defineConstants", () => {
  const defs = [
    {
      key: "POP",
      value: 1,
      name: "流行音乐",
    },
    {
      key: "ROCK",
      value: 2,
      name: "摇滚音乐",
    },
  ] as const;

  test("should return correct keys", () => {
    const dict = defineConstants(defs, "MUSIC_TYPE");
    expect(Object.keys(dict)).toEqual([
      "MUSIC_TYPE_KEYS",
      "MUSIC_TYPE_VALUES",
      "MUSIC_TYPE_KV",
      "MUSIC_TYPE_VK",
      "MUSIC_TYPE_LIST",
      "MUSIC_TYPE_MAP_BY_KEY",
      "MUSIC_TYPE_MAP_BY_VALUE",
    ]);
  });

  test("usage", () => {
    const {
      MUSIC_TYPE_KEYS,
      MUSIC_TYPE_VALUES,
      MUSIC_TYPE_KV,
      MUSIC_TYPE_VK,
      MUSIC_TYPE_MAP_BY_KEY,
      MUSIC_TYPE_MAP_BY_VALUE,
      MUSIC_TYPE_MAP,
      MUSIC_TYPE_LIST,
    } = defineConstants(defs, "MUSIC_TYPE");
    expect(MUSIC_TYPE_KEYS).toEqual(["POP", "ROCK"]);
    expect(MUSIC_TYPE_VALUES).toEqual([1, 2]);
    expect(MUSIC_TYPE_KV).toEqual({ POP: 1, ROCK: 2 });
    expect(MUSIC_TYPE_VK).toEqual({ 1: "POP", 2: "ROCK" });
    expect(MUSIC_TYPE_MAP_BY_KEY).toEqual({
      POP: { key: "POP", value: 1, name: "流行音乐" },
      ROCK: { key: "ROCK", value: 2, name: "摇滚音乐" },
    });
    expect(MUSIC_TYPE_MAP_BY_VALUE).toEqual({
      1: { key: "POP", value: 1, name: "流行音乐" },
      2: { key: "ROCK", value: 2, name: "摇滚音乐" },
    });
    expect(MUSIC_TYPE_MAP).toEqual({ POP: 1, ROCK: 2 });
    expect(MUSIC_TYPE_LIST).toEqual(defs);
  });
});
