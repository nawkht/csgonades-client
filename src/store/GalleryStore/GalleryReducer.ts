import { Reducer } from "redux";
import { ImageRes } from "../../api/GalleryApi";
import { assertNever } from "../../utils/Common";
import { GalleryActions } from "./GalleryActions";

export type ImageCollection = "nades" | "articles";

type FolderImages = { [folder in ImageCollection]?: ImageRes[] };

export type GalleryState = {
  folders: FolderImages;
};

const initialState: GalleryState = {
  folders: {},
};

export const GalleryReducer: Reducer<GalleryState, GalleryActions> = (
  state = initialState,
  action
): GalleryState => {
  switch (action.type) {
    case "@@gallery/REPLACE_FOLDER_IMAGE":
      return {
        ...state,
        folders: {
          ...state.folders,
          [action.folder]: action.images,
        },
      };
    case "@@gallery/ADD_IMAGE_TO_COLLECTION":
      const prevImages = state.folders[action.collection] || [];
      return {
        ...state,
        folders: {
          ...state.folders,
          [action.collection]: [...prevImages, action.image],
        },
      };
    default:
      assertNever(action);
      return state;
  }
};
