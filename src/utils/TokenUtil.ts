import jwt from "jsonwebtoken";
import { Role } from "../models/User";

type DecodedToken = {
  steamId: string;
  role: Role;
  iat: number;
  exp: number;
};

function decodeToken(token: string): DecodedToken {
  const decodedToken = jwt.decode(token) as DecodedToken;
  return decodedToken;
}

export function tokenExpiredOrAboutTo(token: string): boolean {
  const timeLeft = timeToExpire(token);
  const secondBeforeExpireToRefresh = 60;

  if (timeLeft < secondBeforeExpireToRefresh) {
    return true;
  }

  return false;
}

export function timeToExpire(token: string) {
  const { exp } = decodeToken(token);
  const now = Date.now();
  const timeLeft = Math.round(exp - now / 1000);

  return timeLeft;
}
