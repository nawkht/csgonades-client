import axios from "axios";
import { ok } from "neverthrow";
import { Notification } from "../models/Notification";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class NotificationApi {
  static async getNotifications(token: string): AppResult<Notification[]> {
    try {
      const res = await axios.get<Notification[]>(`${BASE_URL}/notifications`, {
        headers: { Authorization: token },
      });
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async markAsViewed(id: string, token: string) {
    try {
      await axios.patch(
        `${BASE_URL}/notifications/${id}/viewed`,
        {},
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
