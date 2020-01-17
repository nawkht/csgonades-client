import axios from "axios";
import { ok } from "neverthrow";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export type SiteStats = {
  numUsers: number;
  numNades: number;
  numPending: number;
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
