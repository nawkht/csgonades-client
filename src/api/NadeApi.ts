import { Nade, NadeBody } from "../models/Nade";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com"
    : "http://localhost:5000";

export class NadeApi {
  static async getAll() {
    const res = await axios.get(`${BASE_URL}/nades`);
    const nades = res.data as Nade[];
    return nades;
  }

  static async getByMap(mapName: string): Promise<Nade[]> {
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

  static async save(nadeBody: NadeBody, token?: string): Promise<Nade | null> {
    try {
      if (!token) {
        throw new Error("Missing auth token for request");
      }

      const res = await axios.post(`${BASE_URL}/nades`, nadeBody, {
        headers: { Authorization: token }
      });
      const nade = res.data as Nade;
      return nade;
    } catch (error) {
      console.error("Failed NadeApi.save", error.message);
      return null;
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
}
