import jwt from "jsonwebtoken";

export type User = {
  nickname: string;
  steamID: string;
  email?: string;
  avatar?: string;
  bio?: string;
};

const decodeUserFromToken = (token: string): User | null => {
  const decoded = jwt.decode(token, { complete: true });
  // @ts-ignore
  if (!decoded || !decoded.payload || !decoded.payload.user) {
    return null;
  }
  // @ts-ignore
  return decoded.payload.user;
};
