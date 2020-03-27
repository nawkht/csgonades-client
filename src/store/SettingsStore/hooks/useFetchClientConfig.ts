import { useEffect } from "react";
import { ClientConfigApi } from "../../../api/ClientConfigApi";
import { replaceClientConfigAction } from "../SettingsActions";
import { useDispatch } from "react-redux";

export const useFetchClientConfig = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const clientConfigFetch = setInterval(async () => {
      const res = await ClientConfigApi.fetchClientConfig();
      if (res.isOk()) {
        dispatch(replaceClientConfigAction(res.value));
      }
    }, 120 * 1000);
    return () => clearInterval(clientConfigFetch);
  }, [dispatch]);
};
