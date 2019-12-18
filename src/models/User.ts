type Role = "administrator" | "moderator" | "user";

export type User = {
  nickname: string;
  steamID: string;
  email: string | null;
  avatar: string | null;
  bio: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
};
