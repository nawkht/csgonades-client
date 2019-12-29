export const NadeTickrate = {
  any: "Any",
  tick64: "64 Tick",
  tick128: "128 Tick"
};

export type Tickrate = keyof typeof NadeTickrate;

export function nadeTickrateOptions() {
  let options = [];
  for (let key in NadeTickrate) {
    const objKey = key as Tickrate;
    const text = tickrateString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey
    });
  }
  return options;
}

export function tickrateString(tick: Tickrate) {
  return NadeTickrate[tick];
}
