import { User } from "./User";
import { Technique } from "./Technique";

export type CsgoMap =
  | "notset"
  | "dust2"
  | "mirage"
  | "nuke"
  | "inferno"
  | "cache"
  | "overpass"
  | "vertigo"
  | "train"
  | "cobblestone";

export const NadeMovements = {
  notset: "Select...",
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

export type NadeType = "notset" | "smoke" | "flash" | "molotov" | "he-grenade";

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

type NadeImages = {
  thumbnail: string;
  large: string;
};

export type Nade = {
  id: string;
  title: string;
  description: string;
  gfycat: GfycatData;
  images: NadeImages;
  map: CsgoMap;
  stats: NadeStats;
  movement: Movement;
  technique: Technique;
  tickrate: Tickrate;
  type: NadeType;
  steamId: string;
  user: User;
  createAt: Date;
  updatedAt: Date;
  status: Status;
  statusInfo?: StatusInfo;
};

export type NadeBody = {
  gfycatIdOrUrl: string;
  imageBase64: string;
  title?: string;
  description?: string;
  map?: CsgoMap;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  steamId?: string;
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
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
