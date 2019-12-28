import { NextPage } from "next";
import { User } from "../src/models/User";
import { UserApi } from "../src/api/UserApi";
import { UserPage } from "../src/pages/users/UsersPage";
import { AppError } from "../src/utils/ErrorUtil";

interface Props {
  user?: User;
  error?: AppError;
}

const UserPageComponent: NextPage<Props> = ({ user, error }) => {
  return <UserPage user={user} error={error} />;
};

UserPageComponent.getInitialProps = async context => {
  const steamId = context.query.id as string;

  const userResult = await UserApi.fetchUser(steamId);

  if (userResult.isErr()) {
    return { error: userResult.error };
  }

  return { user: userResult.value };
};

export default UserPageComponent;
