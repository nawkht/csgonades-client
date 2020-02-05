import axios, { AxiosRequestConfig } from "axios";
import { ok } from "neverthrow";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

type TokenRes = {
  accessToken: string;
};

export class AuthApi {
  static async refreshToken(cookie?: string): AppResult<string> {
    try {
      let config: AxiosRequestConfig = {
        withCredentials: true,
      };

      if (cookie) {
        config = {
          ...config,
          headers: {
            cookie: cookie,
          },
        };
      }

      const res = await axios.get<TokenRes>(`${BASE_URL}/auth/refresh`, config);
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
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
