import { Layout } from "../../ui-common/layout/layout";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";
import { useUsersState } from "../../store/UsersStore/UsersHooks";

const UserPage: React.FC = () => {
  const { user, error, nades } = useUsersState();
  return (
    <Layout title={user ? user.nickname : "User not found"}>
      {error && <UserNotFound />}
      {user && <UserUI user={user} nades={nades} />}
    </Layout>
  );
};

export { UserPage };
