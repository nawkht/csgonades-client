import { useEffect } from "react";
import { ClientConfigApi } from "../../../api/ClientConfigApi";
import { useDispatch } from "react-redux";
import { replaceClientConfigAction } from "../GlobalActions";

export const useFetchClientConfig = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await ClientConfigApi.fetchClientConfig();
      if (res.isOk()) {
        dispatch(replaceClientConfigAction(res.value));
      }
    })();

    const clientConfigFetch = setInterval(async () => {
      const res = await ClientConfigApi.fetchClientConfig();
      if (res.isOk()) {
        dispatch(replaceClientConfigAction(res.value));
      }
    }, 120 * 1000);
    return () => clearInterval(clientConfigFetch);
  }, [dispatch]);
};
