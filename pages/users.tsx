import { NextPage } from "next";
import { UserApi } from "../src/api/UserApi";
import { UserPage } from "../src/pages/users/UsersPage";
import { NadeApi } from "../src/api/NadeApi";
import {
  setUsersError,
  setViewingUserAction
} from "../src/store/UsersStore/UsersActions";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async context => {
  const { dispatch } = context.store;
  const steamId = context.query.id as string;

  const userResult = await UserApi.fetchUser(steamId);

  if (userResult.isErr()) {
    dispatch(setUsersError(userResult.error));
    return;
  }

  dispatch(setViewingUserAction(userResult.value));

  return;
};

export default UserPageComponent;
