import { Nade } from "../models/Nade";
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
    const res = await axios.get(`${BASE_URL}/nades/${id}`);
    const nades = res.data as Nade;
    return nades;
  }
}
