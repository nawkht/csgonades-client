import { useUsersState } from "../../store/UsersStore/UsersHooks";
import { Layout } from "../../ui-common/layout/Layout";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";

const UserPage: React.FC = () => {
  const { user, error, nades } = useUsersState();
  return (
    <Layout
      title={user ? user.nickname : "User not found"}
      canonical={user?.steamId ? `/users/${user?.steamId}` : undefined}
    >
      {error && <UserNotFound />}
      {user && <UserUI user={user} nades={nades} />}
    </Layout>
  );
};

export { UserPage };
