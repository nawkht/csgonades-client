import {
  Nade,
  NadeBody,
  NadeUpdateBody,
  NadeLight,
  CsgoMap,
  NadeStatusDTO,
  GfycatData
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
  static async getAll(): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${BASE_URL}/nades`);
      const nades = res.data as NadeLight[];

      return ok(nades);
    } catch (error) {
      console.error(error);
      return err(getError(error.message));
    }
  }

  static async getByMap(
    mapName: CsgoMap,
    filter?: NadeFilterOptions
  ): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${BASE_URL}/nades/map/${mapName}`);
      const nades = res.data as NadeLight[];

      return ok(nades);
    } catch (error) {
      console.error(error);
      return err(getError(error.message));
    }
  }

  static async byId(id: string): AppResult<Nade> {
    try {
      const res = await axios.get(`${BASE_URL}/nades/${id}`, {
        withCredentials: true
      });

      const nades = res.data as Nade;
      return ok(nades);
    } catch (error) {
      console.error(error);
      return err(getError(error.message));
    }
  }

  static async byUser(steamId: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${BASE_URL}/nades/user/${steamId}`);
      const nades = res.data as NadeLight[];
      return ok(nades);
    } catch (error) {
      console.error(error);
      return err(getError(error.message));
    }
  }

  static async byNadeIdList(nadeIds: string[]): AppResult<NadeLight[]> {
    try {
      const res = await axios.post(`${BASE_URL}/nades/list`, {
        nadeIds
      });
      const nades = res.data as NadeLight[];
      return ok(nades);
    } catch (error) {
      console.error(error);
      return err(getError(error.message));
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
      console.error(error);
      return err(getError(error.message));
    }
  }

  static async update(
    nadeId: string,
    updateFields: NadeUpdateBody,
    token: string
  ): AppResult<Nade> {
    try {
      const res = await axios.put(`${BASE_URL}/nades/${nadeId}`, updateFields, {
        headers: { Authorization: token }
      });

      const updatedNade = res.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      console.error("NadeApi.update failed", error);
      return err(getError(error));
    }
  }

  static async delete(nadeId: string, token: string): AppResult<boolean> {
    try {
      await axios.delete(`${BASE_URL}/nades/${nadeId}`, {
        headers: { Authorization: token }
      });

      return ok(true);
    } catch (error) {
      console.error("NadeApi.delete", error);
      return err(getError(error));
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
    token: string
  ): AppResult<Nade> {
    try {
      const res = await axios.patch(
        `${BASE_URL}/nades/${nadeId}/status`,
        updates,
        {
          headers: { Authorization: token }
        }
      );
      const updatedNade = res.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      console.error(error);
      return err(getError(error));
    }
  }

  static async updateUser(
    nadeId: string,
    steamId: string,
    token: string
  ): AppResult<Nade> {
    try {
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

      return ok(updatedNade);
    } catch (error) {
      console.error(error);
      return err(getError(error));
    }
  }

  static async validateGfycat(gfyIdOrUrl: string): AppResult<GfycatData> {
    try {
      const res = await axios.post(`${BASE_URL}/nades/validateGfycat`, {
        gfycatIdOrUrl: gfyIdOrUrl
      });
      const gfycatData = res.data as GfycatData;
      return ok(gfycatData);
    } catch (error) {
      console.error(error);
      return err(getError(error));
    }
  }
}
