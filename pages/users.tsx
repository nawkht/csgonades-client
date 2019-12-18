import { NextPage } from "next";
import { User } from "../src/models/User";
import { UserApi } from "../src/api/UserApi";
import { ApiError } from "../src/api/ApiError";
import { UserPage } from "../src/pages/users/UsersPage";

interface Props {
  user?: User;
  error?: ApiError;
}

const UserPageComponent: NextPage<Props> = ({ user, error }) => {
  return <UserPage user={user} error={error} />;
};

UserPageComponent.getInitialProps = async context => {
  const steamId = context.query.id as string;

  const { user, error } = await UserApi.fetchUser(steamId);
  return {
    user,
    error
  };
};

export default UserPageComponent;
