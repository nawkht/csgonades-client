import { Layout } from "../../ui-common/layout/layout";
import { User } from "../../models/User";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";
import { AppError } from "../../utils/ErrorUtil";
import { NadeLight } from "../../models/Nade";

type Props = {
  user?: User;
  userNades?: NadeLight[];
  error?: AppError;
};

const UserPage: React.FC<Props> = ({ user, userNades, error }) => {
  return (
    <Layout>
      {error && <UserNotFound />}
      {user && userNades && <UserUI user={user} nades={userNades} />}
    </Layout>
  );
};

export { UserPage };
