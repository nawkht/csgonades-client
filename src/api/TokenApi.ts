import axios from "axios";
import { AppResult, extractApiError } from "../utils/ErrorUtil";
import { ok } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

type TokenRes = {
  accessToken: string;
};

export class AuthApi {
  static async refreshToken(): AppResult<string> {
    try {
      const res = await axios.get<TokenRes>(`${BASE_URL}/auth/refresh`, {
        withCredentials: true
      });
      return ok(res.data.accessToken);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async setSessionCookie(): Promise<void> {
    await axios.post(`${BASE_URL}/initSession`, {}, { withCredentials: true });
  }

  static async signOut(): Promise<void> {
    try {
      await axios.post(
        `${BASE_URL}/auth/signout`,
        {},
        {
          withCredentials: true
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
