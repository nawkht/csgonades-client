export type CsgoMap =
  | "notset"
  | "dust2"
  | "mirage"
  | "nuke"
  | "inferno"
  | "cache"
  | "overpass";

export type Movement =
  | "notset"
  | "stationary"
  | "crouching"
  | "walking"
  | "running"
  | "crouchwalking";

export type Technique = "notset" | "left" | "right" | "both" | "jumpthrow";

export type Tickrate = "64tick" | "128 tick" | "any";

export type NadeType = "notset" | "smoke" | "flash" | "molotov" | "he-grenade";

export type NadeStats = {
  comments: number;
  favorited: number;
  views: number;
};

export type Nade = {
  id: string;
  gfyID: string;
  title: string;
  description: string;
  map: CsgoMap;
  stats: NadeStats;
  movement: Movement;
  technique: Technique;
  tickrate: Tickrate;
  type: NadeType;
  createAt: Date;
  updatedAt: Date;
};

export type MinimalNade = {
  gfyID: string;
  title: string;
  description: string;
  map: CsgoMap;
  movement: Movement;
  technique: Technique;
  tickrate: Tickrate;
  type: NadeType;
};

export const NewNade = (data: Nade): Nade => {
  return data;
};

export const makeMinimalNade = (): MinimalNade => ({
  gfyID: "",
  description: "",
  map: "notset",
  movement: "notset",
  technique: "notset",
  tickrate: "any",
  title: "",
  type: "notset"
});
