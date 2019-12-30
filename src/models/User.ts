type Role = "administrator" | "moderator" | "user";

export type User = {
  nickname: string;
  steamID: string;
  email?: string;
  avatar: string;
  bio?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
};

export type UserUpdateDTO = Partial<
  Omit<User, "lastActive" | "updatedAt" | "avatar" | "steamID">
>;

export type UserLight = {
  nickname: string;
  steamId: string;
  avatar: string;
};
