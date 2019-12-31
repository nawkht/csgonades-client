import axios from "axios";
import { AppResult, extractApiError } from "../utils/ErrorUtil";
import { ok } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export type SiteStats = {
  numUsers: number;
  numNades: number;
};

export class StatsApi {
  static async getStats(): AppResult<SiteStats> {
    try {
      const result = await axios.get<SiteStats>(`${BASE_URL}/stats`);

      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
