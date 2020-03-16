import { AppState } from "../..";
import { useSelector } from "react-redux";

const clientConfigSelector = (state: AppState) =>
  state.settingsStore.clientConfig;

export const useClientConfig = () => {
  const clientConfig = useSelector(clientConfigSelector);

  return clientConfig;
};
