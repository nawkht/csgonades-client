const CsGoMaps = {
  dust2: "Dust2",
  mirage: "Mirage",
  nuke: "Nuke",
  inferno: "Inferno",
  cache: "Cache",
  overpass: "Overpass",
  vertigo: "Vertigo",
  train: "Train",
  cobblestone: "Cobblestone",
};

export type CsgoMap = keyof typeof CsGoMaps;
export type CsgoMapKeys = keyof typeof CsGoMaps;

type MapOption = {
  key: CsgoMapKeys;
  text: string;
  value: CsgoMapKeys;
};

export function nadeMapOptions() {
  const options: MapOption[] = [];
  for (const key in CsGoMaps) {
    const map = key as CsgoMapKeys;
    options.push({
      key: map,
      text: CsGoMaps[map],
      value: map,
    });
  }
  return options;
}

export function mapString(csgoMap: CsgoMap) {
  return CsGoMaps[csgoMap];
}
