import { Layout } from "../../ui-common/layout/layout";
import { User } from "../../models/User";
import { ApiError } from "../../api/ApiError";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";

type Props = {
  user?: User;
  error?: ApiError;
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
