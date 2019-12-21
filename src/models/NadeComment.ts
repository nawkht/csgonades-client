import { User, UserLight } from "./User";

export type NadeComment = {
  id: string;
  body: string;
  user: UserLight;
};
