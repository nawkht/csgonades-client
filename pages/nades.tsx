import { NextPage } from "next";
import { NadeApi } from "../src/api/NadeApi";
import { NadePage } from "../src/pages/nades/NadePage";
import { useEffect } from "react";
import { GoogleAnalytics } from "../src/utils/GoogleAnalytics";
import { addSelectedNadeAction } from "../src/store/NadeStore/NadeActions";
import { useSelectedNade } from "../src/store/NadeStore/NadeSelectors";

interface Props {
  apiCallDuration: number;
}

const NadePageComponent: NextPage<Props> = ({ apiCallDuration }) => {
  useEffect(() => {
    GoogleAnalytics.timing("NadeApi.byId", "network", apiCallDuration);
  }, []);

  const nade = useSelectedNade();

  if (!nade) {
    return null;
  }

  return <NadePage nade={nade} />;
};

NadePageComponent.getInitialProps = async context => {
  const { dispatch } = context.store;
  const nadeId = context.query.id as string;

  const timeBefore = Date.now();
  const nadeResult = await NadeApi.byId(nadeId);
  const timeAfter = Date.now();
  const diff = timeAfter - timeBefore;

  if (nadeResult.isOk()) {
    addSelectedNadeAction(nadeResult.value, dispatch);
  } else {
    if (context.res) {
      context.res.statusCode = 404;
      context.res.end();
    }
  }

  return { apiCallDuration: diff };
};

export default NadePageComponent;
