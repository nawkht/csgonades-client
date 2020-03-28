import { UserLight } from "../User";
import { CsgoMap } from "./CsGoMap";
import { GfycatData } from "./GfycatData";
import { NadeImages } from "./NadeImages";
import { Movement } from "./NadeMovement";
import { Tickrate } from "./NadeTickrate";
import { NadeType } from "./NadeType";
import { Technique } from "./Technique";

export type Status = "pending" | "accepted" | "declined" | "deleted";

export type StatusInfo = string;

export type MapCoordinates = {
  x: number;
  y: number;
};

export type Nade = {
  id: string;
  title: string;
  slug?: string;
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
  viewCount: number;
  commentCount: number;
  favoriteCount: number;
  mapEndCoord?: MapCoordinates;
  score: number;
};

export type NadeLight = {
  id: string;
  status: Status;
  title?: string;
  slug?: string;
  gfycat: GfycatData;
  images: NadeImages;
  type?: NadeType;
  tickrate?: Tickrate;
  createdAt: Date;
  viewCount: number;
  favoriteCount: number;
  mapEndCoord?: MapCoordinates;
  score: number;
  userAvatar: string;
  isFavorited?: boolean;
  technique?: Technique;
  commentCount: number;
  movement?: Movement;
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
  createdAt?: Date;
  mapEndCoord?: MapCoordinates;
};

export type NadeStatusDTO = {
  status: Status;
  statusInfo?: StatusInfo;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};
