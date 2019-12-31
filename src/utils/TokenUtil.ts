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
  const { exp } = decodeToken(token);

  const buffer = 60 * 1000; // 1 minute

  if (Date.now() >= exp * 1000 - buffer) {
    return true;
  }

  return false;
}
