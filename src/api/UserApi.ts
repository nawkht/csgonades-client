import axios from "axios";
import { User } from "../models/User";
import { AppResult, getError } from "../utils/ErrorUtil";
import { ok, err } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class UserApi {
  static fetchSelf = async (token: string): AppResult<User> => {
    try {
      const res = await axios.get(`${BASE_URL}/users/self`, {
        headers: { Authorization: token }
      });
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return err(getError(error));
    }
  };

  static fetchUser = async (steamId: string): AppResult<User> => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${steamId}`);
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return err(getError(error));
    }
  };

  static fetchUsers = async (): AppResult<User[]> => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      const users = res.data as User[];
      return ok(users);
    } catch (error) {
      return err(getError(error));
    }
  };
}
