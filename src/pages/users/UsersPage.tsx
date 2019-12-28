import { Layout } from "../../ui-common/layout/layout";
import { User } from "../../models/User";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";
import { AppError } from "../../utils/ErrorUtil";

type Props = {
  user?: User;
  error?: AppError;
};

const UserPage: React.FC<Props> = ({ user, error }) => {
  return (
    <Layout>
      {error && <UserNotFound />}
      {user && <UserUI user={user} />}
    </Layout>
  );
};

export { UserPage };
