import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { Tournament, TournamentCreateDTO } from "../models/Tournament";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export class TournamentApi {
  static async getAll(): AppResult<Tournament[]> {
    try {
      const tournaments = await axios.get<Tournament[]>(
        `${Config.API_URL}/tournaments`
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
      await axios.post(`${Config.API_URL}/tournaments`, tournament, {
        headers: { Authorization: token },
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
