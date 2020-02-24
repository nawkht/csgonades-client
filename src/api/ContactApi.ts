import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { ConctactDTO } from "../models/Contact";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export class ContactApi {
  static async sendMessage(message: ConctactDTO): AppResult<boolean> {
    try {
      await axios.post(`${Config.API_URL}/contact`, message);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
