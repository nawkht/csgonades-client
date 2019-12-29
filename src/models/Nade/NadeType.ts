export const NadeTypes = {
  smoke: "Smoke",
  flash: "Flash",
  molotov: "Molotov",
  "he-grenade": "HE Grenade"
};

export type NadeType = keyof typeof NadeTypes;

export function nadeTypeOptions() {
  let options = [];
  for (let key in NadeTypes) {
    const objKey = key as NadeType;
    const text = nadeTypeString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey
    });
  }
  return options;
}

export function nadeTypeString(nadeType: NadeType) {
  return NadeTypes[nadeType];
}
