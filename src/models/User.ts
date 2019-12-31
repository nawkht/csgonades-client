export type Role = "administrator" | "moderator" | "user";

export type User = {
  nickname: string;
  steamID: string;
  email?: string;
  avatar: string;
  bio?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  lastActive: string;
};

export type UserUpdateDTO = {
  nickname?: string;
  email?: string;
  bio?: string;
  createdAt?: Date;
};

export type UserLight = {
  nickname: string;
  steamId: string;
  avatar: string;
};
