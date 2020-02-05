import { NextPage } from "next";
import { NadeNotFound } from "../src/pages/nades/NadeNotFound";
import { NadePage } from "../src/pages/nades/NadePage";
import {
  nadeErrorSelector,
  useNadeError,
  useSelectedNade,
} from "../src/store/NadeStore/NadeSelectors";
import { fetchNadeByIdAction } from "../src/store/NadeStore/NadeThunks";

const NadePageComponent: NextPage = () => {
  const error = useNadeError();
  const nade = useSelectedNade();

  if (error) {
    return <NadeNotFound />;
  }

  if (nade && !error) {
    return <NadePage nade={nade} />;
  }

  return null;
};

NadePageComponent.getInitialProps = async context => {
  const { dispatch, getState } = context.store;
  const nadeId = context.query.id as string;

  await dispatch(fetchNadeByIdAction(nadeId));

  const error = nadeErrorSelector(getState());

  if (error && context.res) {
    context.res.statusCode = 404;
  }

  return;
};

export default NadePageComponent;
