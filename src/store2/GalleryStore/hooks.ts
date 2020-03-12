import { useCallback, useContext } from "react";
import { GalleryStoreContext } from "./context";
import { ImageCollection } from "./reducer";

export const useFetchImagesInFolder = () => {
  const fetchImagesInFolder = useCallback((folder: ImageCollection) => {
    console.log("Not implemented", folder);
  }, []);

  return fetchImagesInFolder;
};

export const useGalleryUpload = () => {
  const galleryUpload = useCallback(
    (base64image: string, collection: ImageCollection) => {
      console.log("not implemented", { base64image, collection });
    },
    []
  );

  return galleryUpload;
};

export const useGalleryImages = () => {
  const { state } = useContext(GalleryStoreContext);

  const images = state.folders.articles;

  if (!images) {
    return [];
  } else {
    return images;
  }
};
