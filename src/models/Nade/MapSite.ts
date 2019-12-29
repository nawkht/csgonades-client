export const MapSites = {
  a: "A",
  b: "B",
  mid: "Mid"
};

export type MapSite = keyof typeof MapSites;

export function nadeMapSiteOptions() {
  let options = [];
  for (let key in MapSites) {
    options.push({
      key,
      //@ts-ignore
      text: MapSites[key],
      value: key
    });
  }
  return options;
}
