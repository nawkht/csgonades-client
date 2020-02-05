import Router from "next/router";
import { NadeType } from "../models/Nade/NadeType";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const redirectUserPage = (steamId: string, edit?: boolean) => {
  if (edit) {
    Router.push(
      `/users?id=${steamId}&edit=true`,
      `/users/${steamId}?edit=true`
    );
  } else {
    Router.push(`/users?id=${steamId}`, `/users/${steamId}`);
  }
};

export const redirectNadePage = (nadeId: string) => {
  Router.push(`/nades?id=${nadeId}`, `/nades/${nadeId}`);
};

export function iconFromType(type?: NadeType) {
  switch (type) {
    case "flash":
      return "/icons/grenades/flash.png";
    case "hegrenade":
      return "/icons/grenades/hegrenade.png";
    case "molotov":
      return "/icons/grenades/molotov.png";
    case "smoke":
      return "/icons/grenades/smoke.png";
    default:
      console.warn("Provided unsupported type", type);
      return "";
  }
}

export function kFormatter(num: number) {
  const isBelow1k = Math.abs(num) > 999;

  if (isBelow1k) {
    // @ts-ignore
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
}

export function cleanGfycatUrl(gfycatIdOrUrl: string): string {
  const index = gfycatIdOrUrl.lastIndexOf("/");
  let gfyId: string | string[] = gfycatIdOrUrl.substr(index + 1);
  gfyId = gfyId.split("-");

  if (typeof gfyId === "string") {
    return gfyId;
  }

  return gfyId[0];
}

export function assertNever(never: never) {}
