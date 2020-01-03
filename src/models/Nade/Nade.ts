import { UserLight } from "../User";
import { Technique } from "./Technique";
import { MapSite } from "./MapSite";
import { CsgoMap } from "./CsGoMap";
import { Movement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { NadeImages } from "./NadeImages";
import { GfycatData } from "./GfycatData";

export type Status = "pending" | "accepted" | "declined" | "deleted";

export type StatusInfo = string;

export type Nade = {
  id: string;
  title: string;
  description?: string;
  gfycat: GfycatData;
  images: NadeImages;
  map?: CsgoMap;
  movement?: Movement;
  technique?: Technique;
  tickrate?: Tickrate;
  type?: NadeType;
  steamId: string;
  user: UserLight;
  createdAt: string;
  updatedAt: string;
  status: Status;
  statusInfo?: StatusInfo;
  mapSite?: MapSite;
  viewCount: number;
  favoriteCount: number;
};

export type NadeLight = {
  id: string;
  status: Status;
  title?: string;
  gfycat: GfycatData;
  images: NadeImages;
  type?: NadeType;
  mapSite?: MapSite;
  tickrate?: Tickrate;
  createdAt: Date;
  viewCount: number;
  favoriteCount: number;
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
  createdAt?: Date;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
