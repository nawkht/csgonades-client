import { User, UserLight } from "./User";
import { Technique } from "./Technique";

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

export const NadeMovements = {
  stationary: "Stationary",
  crouching: "Crouching",
  walking: "Walking",
  running: "Running",
  crouchwalking: "Crouchwalking"
};

export function nadeMovementOptions() {
  let options = [];
  for (let key in NadeMovements) {
    options.push({
      key,
      //@ts-ignore
      text: NadeMovements[key],
      value: key
    });
  }
  return options;
}

export type Movement = keyof typeof NadeMovements;

export type Status = "pending" | "accepted" | "declined" | "deleted";

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

export type NadeType = "smoke" | "flash" | "molotov" | "he-grenade";

export type NadeStats = {
  comments: number;
  favorited: number;
  views: number;
};

export type StatusInfo = string;

export type GfycatData = {
  gfyId: string;
  smallVideoUrl: string;
};

export type NadeImages = {
  thumbnailId: string;
  thumbnailUrl: string;
  largeId: string;
  largeUrl: string;
};

export type Nade = {
  id: string;
  title: string;
  description?: string;
  gfycat: GfycatData;
  images: NadeImages;
  map?: CsgoMap;
  stats: NadeStats;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  steamId: string;
  user: UserLight;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  statusInfo?: StatusInfo;
  mapSite?: MapSite;
};

export type NadeLight = {
  id: string;
  title?: string;
  gfycat: GfycatData;
  images: NadeImages;
  type?: NadeType;
  tickrate?: Tickrate;
  createdAt: Date;
  stats: NadeStats;
  mapSite?: MapSite;
};

export type NadeBody = {
  gfycatIdOrUrl: string;
  imageBase64: string;
};

export type NadeUpdateBody = {
  title?: string;
  description?: string;
  gfycatIdOrUrl?: string;
  map?: CsgoMap;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  steamId?: string;
  status?: Status;
  statusInfo?: StatusInfo;
  mapSite?: MapSite;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
