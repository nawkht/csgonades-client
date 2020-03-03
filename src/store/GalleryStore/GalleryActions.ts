import { ImageRes } from "../../api/GalleryApi";
import { ImageCollection } from "./GalleryReducer";

type ReplaceFolderImages = {
  type: "@@gallery/REPLACE_FOLDER_IMAGE";
  folder: ImageCollection;
  images: ImageRes[];
};

export const replaceFolderImagesAction = (
  folder: ImageCollection,
  images: ImageRes[]
): ReplaceFolderImages => ({
  type: "@@gallery/REPLACE_FOLDER_IMAGE",
  folder,
  images,
});

type AddImageToCollection = {
  type: "@@gallery/ADD_IMAGE_TO_COLLECTION";
  collection: ImageCollection;
  image: ImageRes;
};

export const addImageToCollectionAction = (
  collection: ImageCollection,
  image: ImageRes
): AddImageToCollection => ({
  type: "@@gallery/ADD_IMAGE_TO_COLLECTION",
  collection,
  image,
});

export type GalleryActions = ReplaceFolderImages | AddImageToCollection;
