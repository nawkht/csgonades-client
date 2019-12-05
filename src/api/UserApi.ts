import axios from "axios";
import { User } from "../models/User";

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
}
