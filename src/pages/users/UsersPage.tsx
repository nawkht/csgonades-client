import { Layout } from "../../ui-common/layout/layout";
import { User } from "../../models/User";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";
import { AppError } from "../../utils/ErrorUtil";
import { NadeLight } from "../../models/Nade/Nade";
import { useUsersState } from "../../store/UsersStore/UsersHooks";

const UserPage: React.FC = () => {
  const { user, error, nades } = useUsersState();
  return (
    <Layout>
      {error && <UserNotFound />}
      {user && <UserUI user={user} nades={nades} />}
    </Layout>
  );
};

export { UserPage };
