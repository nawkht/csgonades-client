import axios from "axios";
import { ok } from "neverthrow";
import { extractApiError } from "../utils/ErrorUtil";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class NotificationApi {
  static async getNotifications(token: string) {
    try {
      await axios.post(`${BASE_URL}/notification`, {
        headers: { Authorization: token }
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
