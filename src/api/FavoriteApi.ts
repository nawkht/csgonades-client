import axios from "axios";
import { AppResult, getError } from "../utils/ErrorUtil";
import { Favorite } from "../models/Favorite";
import { ok, err } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class FavoriteApi {
  static async getUserFavorites(token: string): AppResult<Favorite[]> {
    try {
      const res = await axios.get(`${BASE_URL}/favorites`, {
        headers: { Authorization: token }
      });
      const favorites = res.data as Favorite[];
      return ok(favorites);
    } catch (error) {
      const prettyError = getError(error);
      return err(prettyError);
    }
  }

  static async favorite(nadeId: string, token: string): AppResult<Favorite> {
    try {
      const res = await axios.post(
        `${BASE_URL}/favorites/${nadeId}`,
        undefined,
        {
          headers: { Authorization: token }
        }
      );
      const favorite = res.data as Favorite;
      return ok(favorite);
    } catch (error) {
      const prettyError = getError(error);
      return err(prettyError);
    }
  }

  static async unFavorite(
    favoriteId: string,
    token: string
  ): AppResult<boolean> {
    try {
      await axios.delete(`${BASE_URL}/favorites/${favoriteId}`, {
        headers: { Authorization: token }
      });
      return ok(true);
    } catch (error) {
      const prettyError = getError(error);
      return err(prettyError);
    }
  }
}
