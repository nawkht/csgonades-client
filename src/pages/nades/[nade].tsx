import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NadeNotFound } from "../../nades/NadeNotFound";
import { NadePage } from "../../nades2/NadePage";
import { useFirstRender } from "../../store/GlobalStore/GlobalHooks";
import {
  nadeErrorSelector,
  useNadeError,
  useSelectedNade,
} from "../../store/NadeStore/NadeSelectors";
import { fetchNadeByIdAction } from "../../store/NadeStore/NadeThunks";

type Props = {
  nadeId: string;
};

const NadePageComponent: NextPage<Props> = ({ nadeId }) => {
  const dispatch = useDispatch();
  const { firstRender, firstRenderCompleted } = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      dispatch(fetchNadeByIdAction(nadeId));
      firstRenderCompleted();
    }
  }, [firstRender]);

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
  const nadeId = context.query.nade as string;

  //@ts-ignore
  await dispatch(fetchNadeByIdAction(nadeId));

  const error = nadeErrorSelector(getState());

  if (error && context.res) {
    context.res.statusCode = 404;
  }

  return {
    nadeId,
  };
};

export default NadePageComponent;
