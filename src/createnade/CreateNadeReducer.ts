import { Reducer, useReducer, useMemo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { GfycatData } from "../models/Nade/GfycatData";
import { NadeCreateBody, MapCoordinates } from "../models/Nade/Nade";
import { NadeType } from "../models/Nade/NadeType";
import { Movement } from "../models/Nade/NadeMovement";
import { Technique } from "../models/Nade/Technique";

interface CreateNadeState extends Partial<NadeCreateBody> {
  showImageAdder: boolean;
}

type SetMap = {
  type: "CreateNade/SetMap";
  map: CsgoMap;
};

type SetGfyData = {
  type: "CreateNade/SetGfyData";
  data: GfycatData;
};

type SetEndPosition = {
  type: "CreateNade/SetEndPosition";
  endPosition: string;
};

type SetStartPosition = {
  type: "CreateNade/SetStartPosition";
  startPosition: string;
};

type SetDescription = {
  type: "CreateNade/SetDescription";
  description: string;
};

type SetNadeType = {
  type: "CreateNade/SetNadeType";
  nadeType: NadeType;
};

type SetMovement = {
  type: "CreateNade/SetMovement";
  movement: Movement;
};

type SetImage = {
  type: "CreateNade/SetImage";
  image: string;
};

type ShowImageSelector = {
  type: "CreateNade/ShowImageSelector";
};

type SetEndPosCoords = {
  type: "CreateNade/SetEndPosCoords";
  coords: MapCoordinates;
};

type SetTechnique = {
  type: "CreateNade/SetTechnique";
  technique: Technique;
};

type Actions =
  | SetMap
  | SetGfyData
  | SetEndPosition
  | SetStartPosition
  | SetDescription
  | SetNadeType
  | SetMovement
  | SetImage
  | ShowImageSelector
  | SetEndPosCoords
  | SetTechnique;

const reducer: Reducer<CreateNadeState, Actions> = (state, action) => {
  switch (action.type) {
    case "CreateNade/SetMap":
      return {
        ...state,
        map: action.map,
      };
    case "CreateNade/SetGfyData":
      return {
        ...state,
        gfycat: action.data,
      };
    case "CreateNade/SetEndPosition":
      return {
        ...state,
        endPosition: action.endPosition,
      };
    case "CreateNade/SetStartPosition":
      return {
        ...state,
        startPosition: action.startPosition,
      };
    case "CreateNade/SetDescription":
      return {
        ...state,
        description: action.description,
      };
    case "CreateNade/SetNadeType":
      return {
        ...state,
        type: action.nadeType,
      };
    case "CreateNade/SetMovement":
      return {
        ...state,
        movement: action.movement,
      };
    case "CreateNade/SetImage":
      return {
        ...state,
        imageBase64: action.image,
        showImageAdder: false,
      };
    case "CreateNade/ShowImageSelector":
      return {
        ...state,
        showImageAdder: true,
      };
    case "CreateNade/SetEndPosCoords":
      return {
        ...state,
        mapEndCoord: action.coords,
      };
    case "CreateNade/SetTechnique":
      return {
        ...state,
        technique: action.technique,
      };
    default:
      return state;
  }
};

export const useCreateNadeState = () => {
  const [state, dispatch] = useReducer(reducer, { showImageAdder: false });

  const disableSubmit = useMemo(() => {
    console.log({
      state,
    });
    if (
      !state.map ||
      !state.description ||
      !state.endPosition ||
      !state.gfycat ||
      !state.imageBase64 ||
      !state.mapEndCoord ||
      !state.movement ||
      !state.startPosition ||
      !state.technique ||
      !state.type
    ) {
      return true;
    }
    return false;
  }, [state]);

  return {
    state,
    dispatch,
    disableSubmit,
  };
};
