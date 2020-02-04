import { NextPage } from "next";
import { UserPage } from "../src/pages/users/UsersPage";
import { startEditingUserAction } from "../src/store/UsersStore/UsersActions";
import { userErrorSelector } from "../src/store/UsersStore/UsersSelectors";
import {
  fetchNadesForUserAction,
  fetchUserAction
} from "../src/store/UsersStore/UsersThunks";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async ({ store, query, res }) => {
  const { dispatch, getState } = store;
  const steamId = query.id as string;
  const shouldDisplayEdit = query.edit === "true";

  await Promise.all([
    dispatch(fetchUserAction(steamId)),
    dispatch(fetchNadesForUserAction(steamId))
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
