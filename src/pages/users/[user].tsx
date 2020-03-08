import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFirstRender } from "../../store/GlobalStore/GlobalHooks";
import { startEditingUserAction } from "../../store/UsersStore/UsersActions";
import { userErrorSelector } from "../../store/UsersStore/UsersSelectors";
import {
  fetchNadesForUserAction,
  fetchUserAction,
} from "../../store/UsersStore/UsersThunks";
import { UserPage } from "../../users/UsersPage";

type Props = {
  steamId: string;
};

const UserPageComponent: NextPage<Props> = ({ steamId }) => {
  const dispatch = useDispatch();
  const { firstRender, firstRenderCompleted } = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      dispatch(fetchUserAction(steamId));
      dispatch(fetchNadesForUserAction(steamId));
      firstRenderCompleted();
    }
  }, [firstRender]);

  return <UserPage />;
};

UserPageComponent.getInitialProps = async ({ store, query, res }) => {
  const { dispatch, getState } = store;
  const steamId = query.user as string;
  const shouldDisplayEdit = query.edit === "true";

  await Promise.all([
    //@ts-ignore
    dispatch(fetchUserAction(steamId)),
    //@ts-ignore
    dispatch(fetchNadesForUserAction(steamId)),
  ]);

  const error = userErrorSelector(getState());

  if (error && res) {
    res.statusCode = 404;
  }

  if (shouldDisplayEdit) {
    dispatch(startEditingUserAction());
  }

  return {
    steamId,
  };
};

export default UserPageComponent;
