import {
  Nade,
  NadeBody,
  NadeUpdateBody,
  NadeLight,
  CsgoMap,
  NadeStatusDTO
} from "../models/Nade";
import axios from "axios";
import { AppResult, getError } from "../utils/ErrorUtil";
import { ok, err } from "neverthrow";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export type NadeFilterOptions = {
  smoke: boolean;
  flash: boolean;
  hegrenade: boolean;
  molotov: boolean;
};

export class NadeApi {
  static async getAll(): Promise<NadeLight[]> {
    const res = await axios.get(`${BASE_URL}/nades`);

    const nades = res.data as NadeLight[];
    return nades;
  }

  static async getByMap(
    mapName: CsgoMap,
    filter?: NadeFilterOptions
  ): Promise<NadeLight[]> {
    const res = await axios.get(`${BASE_URL}/nades/map/${mapName}`);
    const nades = res.data as Nade[];
    return nades;
  }

  static async byId(id: string): Promise<Nade | null> {
    try {
      const res = await axios.get(`${BASE_URL}/nades/${id}`, {
        withCredentials: true
      });

      const nades = res.data as Nade;
      return nades;
    } catch (error) {
      console.error("Failed to get nade", error.message);
      return null;
    }
  }

  static async save(nadeBody: NadeBody, token: string): AppResult<Nade> {
    try {
      const res = await axios.post(`${BASE_URL}/nades`, nadeBody, {
        headers: { Authorization: token }
      });
      const nade = res.data as Nade;
      return ok(nade);
    } catch (error) {
      return err(getError(error.message));
    }
  }

  static async update(
    nadeId: string,
    updateFields: NadeUpdateBody,
    token?: string
  ) {
    if (!token) {
      console.warn("NadeApi.update no token provided");
      return;
    }

    try {
      const res = await axios.put(`${BASE_URL}/nades/${nadeId}`, updateFields, {
        headers: { Authorization: token }
      });

      const updatedNade = res.data as Nade;

      return updatedNade;
    } catch (error) {
      console.error("NadeApi.update failed", error);
      return;
    }
  }

  static async registerView(id: string) {
    await axios.post(
      `${BASE_URL}/nades/${id}/countView`,
      {},
      {
        withCredentials: true
      }
    );
  }

  static async updateNadeStatus(
    nadeId: string,
    updates: NadeStatusDTO,
    token?: string
  ) {
    if (!token) {
      console.warn("NadeApi.updateNadeStatus no token provided");
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/nades/${nadeId}/status`,
        updates,
        {
          headers: { Authorization: token }
        }
      );
      const updatedNade = res.data as Nade;

      return updatedNade;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  static async updateUser(nadeId: string, steamId: string, token?: string) {
    if (!token) {
      console.warn("NadeApi.updateUser no token provided");
      return;
    }

    const res = await axios.patch(
      `${BASE_URL}/nades/${nadeId}/setuser/${steamId}`,
      undefined,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const updatedNade = res.data as Nade;

    return updatedNade;
  }
}
