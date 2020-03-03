import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageCollection } from "./GalleryReducer";
import { articleImagesSelector } from "./GallerySelectors";
import {
  fetchGalleryImagesByFolderThunk,
  uploadImageToCollectionThunk,
} from "./GalleryThunks";

export const useFetchImagesInFolder = () => {
  const dispatch = useDispatch();

  const fetchImagesInFolder = useCallback(
    (folder: ImageCollection) => {
      dispatch(fetchGalleryImagesByFolderThunk(folder));
    },
    [dispatch]
  );

  return fetchImagesInFolder;
};

export const useGalleryUpload = () => {
  const dispatch = useDispatch();

  const galleryUpload = useCallback(
    (base64image: string, collection: ImageCollection) => {
      dispatch(uploadImageToCollectionThunk(collection, base64image));
    },
    [dispatch]
  );

  return galleryUpload;
};

export const useGalleryImages = () => {
  const images = useSelector(articleImagesSelector);

  if (!images) {
    return [];
  } else {
    return images;
  }
};
