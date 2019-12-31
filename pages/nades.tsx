import { NextPage } from "next";
import { NadePage } from "../src/pages/nades/NadePage";
import { useSelectedNade } from "../src/store/NadeStore/NadeSelectors";
import { fetchNadeByIdAction } from "../src/store/NadeStore/NadeThunks";

const NadePageComponent: NextPage = () => {
  const nade = useSelectedNade();

  if (!nade) {
    return null;
  }

  return <NadePage nade={nade} />;
};

NadePageComponent.getInitialProps = async context => {
  const { dispatch } = context.store;
  const nadeId = context.query.id as string;

  await dispatch(fetchNadeByIdAction(nadeId));

  return;
};

export default NadePageComponent;
