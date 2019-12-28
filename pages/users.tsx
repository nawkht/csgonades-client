import { NextPage } from "next";
import { User } from "../src/models/User";
import { UserApi } from "../src/api/UserApi";
import { UserPage } from "../src/pages/users/UsersPage";
import { AppError } from "../src/utils/ErrorUtil";
import { NadeApi } from "../src/api/NadeApi";
import { NadeLight } from "../src/models/Nade";

interface Props {
  user?: User;
  nades?: NadeLight[];
  error?: AppError;
}

const UserPageComponent: NextPage<Props> = ({ user, nades, error }) => {
  return <UserPage user={user} userNades={nades} error={error} />;
};

UserPageComponent.getInitialProps = async context => {
  const steamId = context.query.id as string;

  const [userResult, nadeResult] = await Promise.all([
    UserApi.fetchUser(steamId),
    NadeApi.byUser(steamId)
  ]);

  if (userResult.isErr()) {
    return { error: userResult.error };
  }

  if (nadeResult.isErr()) {
    return { error: nadeResult.error };
  }

  return { user: userResult.value, nades: nadeResult.value };
};

export default UserPageComponent;
