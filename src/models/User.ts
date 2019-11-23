import jwt from "jsonwebtoken";

export type User = {
  steamID: string;
  nickname: string;
  email: string | null;
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
