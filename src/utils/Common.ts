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
      return "/icons/grenades/grenade.png";
    case "molotov":
      return "/icons/grenades/molotov.png";
    case "smoke":
      return "/icons/grenades/smoke.png";
    default:
      console.warn("Provided unsupported type", type);
      return "";
  }
}
