import Router from "next/router";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeType } from "../models/Nade/NadeType";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const redirectMapPage = (mapName: CsgoMap) => {
  Router.push(`/maps?mapname=${mapName}`, `/maps/${mapName}`);
};

export const redirectUserPage = (steamId: string) => {
  Router.push(`/users?id=${steamId}`, `/users/${steamId}`);
};

export const redirectNadePage = (nadeId: string) => {
  Router.push(`/nades?id=${nadeId}`, `/nades/${nadeId}`);
};

export function encodeQueryData(data: any) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
}

export function logIt(message?: any) {
  const value = typeof message === "string" ? message : JSON.stringify(message);
  console.log(`%c >> ${value} `, "background: #222; color: #bada55");
}

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

export function roundViewCount(views: number) {
  if (views % 100 < 10) {
    return `${views}`;
  } else {
    const thousands = Math.round(views / 1000) * 1000;
    return `${thousands}k`;
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
