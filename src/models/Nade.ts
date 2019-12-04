import { User } from "./User";

export type CsgoMap =
  | "notset"
  | "dust2"
  | "mirage"
  | "nuke"
  | "inferno"
  | "cache"
  | "overpass"
  | "train"
  | "cobblestone";

export type Movement =
  | "notset"
  | "stationary"
  | "crouching"
  | "walking"
  | "running"
  | "crouchwalking";

type Status = "pending" | "accepted" | "declined" | "deleted";

export type Technique = "notset" | "left" | "right" | "both" | "jumpthrow";

export type Tickrate = "64tick" | "128 tick" | "any";

export type NadeType = "notset" | "smoke" | "flash" | "molotov" | "he-grenade";

export type NadeStats = {
  comments: number;
  favorited: number;
  views: number;
};

type StatusInfo = string;

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

export const NewNade = (data: Nade): Nade => {
  return data;
};
