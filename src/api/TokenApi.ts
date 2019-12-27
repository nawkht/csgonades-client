import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

type TokenRes = {
  accessToken: string;
};

export class AuthApi {
  static async refreshToken(): Promise<string> {
    const res = await axios.get<TokenRes>(`${BASE_URL}/auth/refresh`, {
      withCredentials: true
    });
    return res.data.accessToken;
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
      console.log("Posted signout");
    } catch (error) {
      console.error(error);
    }
  }
}
