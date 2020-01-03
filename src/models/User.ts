export type Role = "administrator" | "moderator" | "user";

export type User = {
  nickname: string;
  steamId: string;
  avatar: string;
  role: Role;
  email?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
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
