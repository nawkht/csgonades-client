import { GalleryApi } from "../../api/GalleryApi";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import {
  addImageToCollectionAction,
  replaceFolderImagesAction,
} from "./GalleryActions";
import { ImageCollection } from "./GalleryReducer";

export const fetchGalleryImagesByFolderThunk = (
  folder: ImageCollection
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.authStore.token;

    if (!token) {
      console.warn("Trying to fetch gallery images when not signed in");
      return;
    }

    const result = await GalleryApi.getImagesInFolder(folder, token);

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    const images = result.value;

    dispatch(replaceFolderImagesAction(folder, images));
  };
};

export const uploadImageToCollectionThunk = (
  collection: ImageCollection,
  base64Image: string
): ReduxThunkAction => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.authStore.token;

    if (!token) {
      console.warn("Trying to fetch gallery images when not signed in");
      return;
    }

    const result = await GalleryApi.uploadImageToCollection(
      collection,
      base64Image,
      token
    );

    if (result.isErr()) {
      console.error(result.error);
      return;
    }

    dispatch(addImageToCollectionAction(collection, result.value));
  };
};
