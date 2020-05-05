import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { GlobalActions } from "../GlobalActions";

export const useGlobalDispatch = () => {
  return useDispatch<Dispatch<GlobalActions>>();
};
