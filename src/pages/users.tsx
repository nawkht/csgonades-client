import { NextPage } from "next";
import { startEditingUserAction } from "../store/UsersStore/UsersActions";
import { userErrorSelector } from "../store/UsersStore/UsersSelectors";
import {
  fetchNadesForUserAction,
  fetchUserAction,
} from "../store/UsersStore/UsersThunks";
import { UserPage } from "../users/UsersPage";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async ({ store, query, res }) => {
  const { dispatch, getState } = store;
  const steamId = query.id as string;
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

  return;
};

export default UserPageComponent;
