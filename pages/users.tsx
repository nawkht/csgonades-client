import { NextPage } from "next";
import { UserPage } from "../src/pages/users/UsersPage";
import { userErrorSelector } from "../src/store/UsersStore/UsersSelectors";
import {
  fetchNadesForUserAction,
  fetchUserAction
} from "../src/store/UsersStore/UsersThunks";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async context => {
  const { dispatch, getState } = context.store;
  const steamId = context.query.id as string;

  await Promise.all([
    dispatch(fetchUserAction(steamId)),
    dispatch(fetchNadesForUserAction(steamId))
  ]);

  const error = userErrorSelector(getState());

  if (error && context.res) {
    context.res.statusCode = 404;
  }

  return;
};

export default UserPageComponent;
