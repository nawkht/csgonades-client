import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { AppResult, extractApiError } from "../utils/ErrorUtil";
import { Vote } from "../models/Vote";

export class VoteApi {
  static async getUserVotes(token: string): AppResult<Vote[]> {
    try {
      const res = await axios.get<Vote[]>(`${Config.API_URL}/votes`, {
        headers: { Authorization: token },
      });
      const votes = res.data;
      return ok(votes);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async castVote(
    nadeId: string,
    voteDir: number,
    token: string
  ): AppResult<Vote> {
    try {
      const res = await axios.post<Vote>(
        `${Config.API_URL}/votes`,
        {
          nadeId,
          vote: voteDir,
        },
        {
          headers: { Authorization: token },
        }
      );
      const vote = res.data;
      return ok(vote);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async clearVote(voteId: string, token: string): AppResult<boolean> {
    try {
      await axios.delete(`${Config.API_URL}/votes/${voteId}`, {
        headers: { Authorization: token },
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
