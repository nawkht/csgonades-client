import { AppState } from "..";

export const articleImagesSelector = (state: AppState) => {
  return state.galleryStore.folders.articles;
};
