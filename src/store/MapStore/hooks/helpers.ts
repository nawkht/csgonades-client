import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { MapStoreActions } from "../actions";
import { MapCoordinates, NadeLight } from "../../../models/Nade/Nade";
import { Tickrate } from "../../../models/Nade/NadeTickrate";
import { NadeType } from "../../../models/Nade/NadeType";
import { NadeSortingMethod } from "../reducer";
import { dateMinutesAgo } from "../../../utils/DateUtils";

export const useMapStoreDispatch = () => {
  return useDispatch<Dispatch<MapStoreActions>>();
};

export function filterByPro(nades: NadeLight[], byPro?: boolean) {
  if (byPro) {
    return nades.filter((n) => n.isPro);
  }
  return nades;
}

export function filterBySortMethod(
  nades: NadeLight[],
  byMethod: NadeSortingMethod
) {
  switch (byMethod) {
    case "new":
      return nades.sort(sortByDate);
    case "top":
      return nades.sort(sortByTop);
    default:
      return nades.sort(sortByScore);
  }
}

function sortByScore(a: NadeLight, b: NadeLight) {
  return b.score - a.score;
}

function sortByDate(a: NadeLight, b: NadeLight) {
  return dateMinutesAgo(a.createdAt) - dateMinutesAgo(b.createdAt);
}

function sortByTop(a: NadeLight, b: NadeLight) {
  const aScore = a.favoriteCount + a.commentCount + Math.log(a.viewCount);
  const bScore = b.favoriteCount + b.commentCount + Math.log(b.viewCount);
  return bScore - aScore;
}

export function filterByType(
  nades: NadeLight[],
  byType?: NadeType
): NadeLight[] {
  if (byType) {
    return nades.filter((n) => n.type === byType);
  } else {
    return nades;
  }
}

export function filterByFavorite(nades: NadeLight[], byFavorite: boolean) {
  if (!byFavorite) {
    return nades;
  }

  return nades.filter((n) => n.isFavorited);
}

export function filterByTickrate(
  nades: NadeLight[],
  byTickrate?: Tickrate
): NadeLight[] {
  if (byTickrate === "tick128") {
    return nades.filter((n) => n.tickrate !== "tick64");
  } else if (byTickrate === "tick64") {
    return nades.filter((n) => n.tickrate !== "tick128");
  } else {
    return nades;
  }
}

export function filterByCoords(nades: NadeLight[], coords?: MapCoordinates) {
  if (!coords) {
    return nades;
  }

  const MIN_DISTANCE = 20;
  return nades.filter((n) => {
    if (!n.mapEndCoord) {
      return false;
    }
    const dist = Math.sqrt(
      Math.pow(n.mapEndCoord.x - coords.x, 2) +
        Math.pow(n.mapEndCoord.y - coords.y, 2)
    );

    if (dist < MIN_DISTANCE) {
      return true;
    }
  });
}

export function addFavoriteToNades(nades: NadeLight[], favIds: string[]) {
  return nades.map((n) => {
    if (favIds.includes(n.id)) {
      return {
        ...n,
        isFavorited: true,
      };
    } else {
      return n;
    }
  });
}

export function containsSimilarNade(
  nade: NadeLight,
  nades: NadeLight[]
): boolean {
  const containsSimilar = nades.find((n) => {
    if (!n.mapEndCoord || !n.type || !nade.mapEndCoord || !nade.type) {
      return false;
    }

    if (nade.type !== n.type) {
      return false;
    }

    const dist = Math.sqrt(
      Math.pow(n.mapEndCoord.x - nade.mapEndCoord.x, 2) +
        Math.pow(n.mapEndCoord.y - nade.mapEndCoord.y, 2)
    );

    if (dist < 20) {
      return true;
    } else {
      return false;
    }
  });

  return !!containsSimilar;
}
