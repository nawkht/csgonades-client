import { NextPage } from "next";
import { UserPage } from "../src/pages/users/UsersPage";
import {
  fetchUserAction,
  fetchNadesForUserAction
} from "../src/store/UsersStore/UsersThunks";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async context => {
  const { dispatch } = context.store;
  const steamId = context.query.id as string;

  await dispatch(fetchUserAction(steamId));
  await dispatch(fetchNadesForUserAction(steamId));

  return;
};

export default UserPageComponent;
