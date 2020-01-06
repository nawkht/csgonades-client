import { TournamentCreateDTO, Tournament } from "../models/Tournament";
import axios from "axios";
import { AppResult, extractApiError } from "../utils/ErrorUtil";
import { ok } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class TournamentApi {
  static async getAll(): AppResult<Tournament[]> {
    try {
      const tournaments = await axios.get<Tournament[]>(
        `${BASE_URL}/tournaments`
      );

      return ok(tournaments.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async save(
    tournament: TournamentCreateDTO,
    token: string
  ): AppResult<boolean> {
    try {
      await axios.post(`${BASE_URL}/tournaments`, tournament, {
        headers: { Authorization: token }
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
