const CsGoMaps = {
  dust2: "Dust2",
  mirage: "Mirage",
  nuke: "Nuke",
  inferno: "Inferno",
  cache: "Cache",
  overpass: "Overpass",
  vertigo: "Vertigo",
  train: "Train",
  cobblestone: "Cobblestone"
};

export type CsgoMap = keyof typeof CsGoMaps;

export function nadeMapOptions() {
  let options = [];
  for (let key in CsGoMaps) {
    options.push({
      key,
      //@ts-ignore
      text: CsGoMaps[key],
      value: key
    });
  }
  return options;
}
