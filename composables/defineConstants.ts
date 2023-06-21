interface IBaseDef {
  key: PropertyKey;
  value: string | number;
}

type ToProperty<Property extends string, N extends string = ""> = N extends ""
  ? Property
  : `${N}_${Property}`;
// type testToProperty = ToProperty<"KV", "MUSIC_TYPE">;
// MUSIC_TYPE_KV

type MergeIntersection<A> = A extends infer T
  ? { [Key in keyof T]: T[Key] }
  : never;
// type testMergeIntersection = MergeIntersection<{ a: 1 } & { b: 2 }>;
// { a: 1, b: 2 }

type ToSingleKeyValue<T> = T extends {
  readonly key: infer K;
  readonly value: infer V;
}
  ? K extends PropertyKey
    ? {
        [Key in K]: V;
      }
    : never
  : never;
// type testToSingleKeyValue = ToSingleKeyValue<{key: 'POP', value: 1}>;
// { POP: 1 }

type ToSingleValueKey<T> = T extends {
  readonly key: infer K;
  readonly value: infer V;
}
  ? V extends PropertyKey
    ? {
        readonly [Key in V]: K;
      }
    : never
  : never;

type ToSingleKeyMap<T> = T extends {
  readonly key: infer K;
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: T;
      }
    : never
  : never;

type ToSingleValueMap<T> = T extends {
  readonly value: infer K;
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: T;
      }
    : never
  : never;

type ToKeyValue<T> = T extends readonly [infer A, ...infer B]
  ? B["length"] extends 0
    ? ToSingleKeyValue<A>
    : MergeIntersection<ToSingleKeyValue<A> & ToKeyValue<B>>
  : [];

type ToValueKey<T> = T extends readonly [infer A, ...infer B]
  ? B["length"] extends 0
    ? ToSingleValueKey<A>
    : MergeIntersection<ToSingleValueKey<A> & ToValueKey<B>>
  : [];
// type testToKeyValue = ToKeyValue<readonly [{key: 'POP', value: 1}, {key: 'ROCK', value: 2}]>
// { POP: 1, ROCK: 2 }

type ToKeys<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
      readonly key: infer K;
    }
    ? B["length"] extends 0
      ? [K]
      : [K, ...ToKeys<B>]
    : never
  : [];

type ToValues<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
      readonly value: infer K;
    }
    ? B["length"] extends 0
      ? [K]
      : [K, ...ToValues<B>]
    : never
  : [];

type ToKeyMap<T> = T extends readonly [infer A, ...infer B]
  ? B["length"] extends 0
    ? ToSingleKeyMap<A>
    : MergeIntersection<ToSingleKeyMap<A> & ToKeyMap<B>>
  : [];

type ToValueMap<T> = T extends readonly [infer A, ...infer B]
  ? B["length"] extends 0
    ? ToSingleValueMap<A>
    : MergeIntersection<ToSingleValueMap<A> & ToValueMap<B>>
  : [];

type testToValueMap = ToValueMap<[{ key: "POP"; value: 1 }]>

// type t = {
//   [Key in ToProperty<"KV", "A">]: ToKeyValue<[{ key: "POP"; value: 1 }]>;
// };
// { A_KV: { POP: 1 } }

export function defineConstants<
  T extends readonly IBaseDef[],
  N extends string
>(defs: T, namespace?: N) {
  const prefix = namespace ? `${namespace}_` : "";
  return {
    [`${prefix}KEYS`]: defs.map((item) => item.key),
    [`${prefix}VALUES`]: defs.map((item) => item.value),
    [`${prefix}KV`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.key]: item.value,
      }),
      {}
    ),
    [`${prefix}VK`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.value]: item.key,
      }),
      {}
    ),
    [`${prefix}MAP_BY_KEY`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.key]: item,
      }),
      {}
    ),
    [`${prefix}MAP_BY_VALUE`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.value]: item,
      }),
      {}
    ),
    [`${prefix}KEY_MAP`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.key]: item,
      }),
      {}
    ),
    [`${prefix}MAP`]: defs.reduce(
      (map, item) => ({
        ...map,
        [item.key]: item.value,
      }),
      {}
    ),
    [`${prefix}LIST`]: defs,
  } as MergeIntersection<
    {
      [Key in ToProperty<"KEYS", N>]: ToKeys<T>;
    } & {
      [Key in ToProperty<"VALUES", N>]: ToValues<T>;
    } & {
      [Key in ToProperty<"KV", N>]: ToKeyValue<T>;
    } & {
      [Key in ToProperty<"VK", N>]: ToValueKey<T>;
    } & {
      [Key in ToProperty<"MAP_BY_KEY", N>]: ToKeyMap<T>;
    } & {
      [Key in ToProperty<"MAP_BY_VALUE", N>]: ToValueMap<T>;
    } & {
      [Key in ToProperty<"MAP", N>]: ToKeyValue<T>;
    } & {
      [Key in ToProperty<"LIST", N>]: T;
    }
  >;
}
