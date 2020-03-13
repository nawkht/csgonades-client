import { Layout2 } from "../common/layout/Layout2";
import { PageCentralize } from "../common/PageCentralize";
import { User } from "../models/User";
import { useUsersState } from "../store/UsersStore/UsersHooks";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";

type Props = {
  user: User;
};

const UserPage: React.FC<Props> = ({ user }) => {
  const { error, nades } = useUsersState();
  return (
    <Layout2
      title={user ? user.nickname : "User not found"}
      canonical={user?.steamId ? `/users/${user?.steamId}` : undefined}
    >
      <PageCentralize>
        {error && <UserNotFound />}
        {user && <UserUI user={user} nades={nades} />}
      </PageCentralize>
    </Layout2>
  );
};

export { UserPage };
