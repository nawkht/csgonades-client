import { NextPage } from "next";
import { UserPage } from "../src/pages/users/UsersPage";
import {
  fetchUserAction,
  fetchNadesForUserAction
} from "../src/store/UsersStore/UsersThunks";
import { userErrorSelector } from "../src/store/UsersStore/UsersSelectors";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async context => {
  const { dispatch, getState } = context.store;
  const steamId = context.query.id as string;

  await dispatch(fetchUserAction(steamId));
  await dispatch(fetchNadesForUserAction(steamId));

  const error = userErrorSelector(getState());

  if (error && context.res) {
    console.log("> Had error");
    context.res.statusCode = 404;
  }

  return;
};

export default UserPageComponent;
