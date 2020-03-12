import { NextPage } from "next";
import { NadeNotFound } from "../../nades/NadeNotFound";
import { NadePage } from "../../nades/NadePage";
import {
  nadeErrorSelector,
  useNadeError,
  useSelectedNade,
} from "../../store/NadeStore/NadeSelectors";
import { fetchNadeByIdAction } from "../../store/NadeStore/NadeThunks";
import { withRedux } from "../../utils/WithRedux";

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
  const { dispatch, getState } = context.reduxStore;
  const nadeId = context.query.nade as string;

  await dispatch(fetchNadeByIdAction(nadeId));

  const error = nadeErrorSelector(getState());

  if (error && context.res) {
    context.res.statusCode = 404;
  }

  return;
};

export default withRedux(NadePageComponent);
