import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export type ClientConfig = {
  useHardLinks: boolean;
};

export class ClientConfigApi {
  static async fetchClientConfig(): AppResult<ClientConfig> {
    try {
      const res = await axios.get<ClientConfig>(
        `${Config.API_URL}/client-config`
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
