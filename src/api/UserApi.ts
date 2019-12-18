import axios from "axios";
import { User } from "../models/User";
import { apiErrorFromAxios, ApiError } from "./ApiError";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class UserApi {
  static fetchSelf = async (token?: string): Promise<User> => {
    if (!token) {
      throw new Error("UserApi.fetchSelf | No token provided");
    }

    try {
      const res = await axios.get(`${BASE_URL}/users/self`, {
        headers: { Authorization: token }
      });
      const user = res.data as User;
      return user;
    } catch (error) {
      console.error(`Error in UserApi.fetchSelf`, error.message);
      throw error;
    }
  };

  static fetchUser = async (
    steamId: string
  ): Promise<{ user?: User; error?: ApiError }> => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${steamId}`);
      const user = res.data as User;
      return {
        user
      };
    } catch (error) {
      return {
        error: apiErrorFromAxios(error)
      };
    }
  };

  static fetchUsers = async (): Promise<User[] | ApiError> => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      const users = res.data as User[];
      return users;
    } catch (error) {
      return apiErrorFromAxios(error);
    }
  };
}
