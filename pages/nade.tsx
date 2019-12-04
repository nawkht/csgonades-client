import { NextPage } from "next";
import { Nade } from "../src/models/Nade";
import { NadeApi } from "../src/api/NadeApi";
import { NadePage } from "../src/pagecontainers/nadepage";

interface Props {
  nade: Nade | null;
}

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    console.warn("No nade found for ID");
    return null;
  }

  return <NadePage nade={nade} />;
};

NadePageComponent.getInitialProps = async context => {
  const nadeId = context.query.id as string;
  console.log("Trying to get nade", nadeId, context.query);
  const nade = await NadeApi.byId(nadeId);
  return { nade };
};

export default NadePageComponent;
