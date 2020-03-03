import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../constants/Constants";
import { ImageCollection } from "../store/GalleryStore/GalleryReducer";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

export type ImageRes = {
  id: string;
  collection: string;
  url: string;
};

export class GalleryApi {
  static async getImagesInFolder(
    collection: ImageCollection,
    token: string
  ): AppResult<ImageRes[]> {
    try {
      const res = await axios.get<ImageRes[]>(
        `${Config.API_URL}/gallery/${collection}`,
        {
          headers: { Authorization: token },
        }
      );

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async uploadImageToCollection(
    collection: ImageCollection,
    base64image: string,
    token: string
  ) {
    try {
      const res = await axios.post<ImageRes>(
        `${Config.API_URL}/gallery/${collection}`,
        {
          image: base64image,
        },
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
