import { GetServerSideProps, NextPage } from "next";
import { UserApi } from "../../api/UserApi";
import { User } from "../../models/User";
import { UserPage } from "../../users/UsersPage";

type Props = {
  user: User | null;
};

const UserPageComponent: NextPage<Props> = ({ user }) => {
  return <UserPage user={user} key={user.steamId} />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const steamId = context.query.user as string;

  const result = await UserApi.fetchUser(steamId);

  if (result.isErr()) {
    context.res.statusCode = 404;
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user: result.value,
    },
  };
};

export default UserPageComponent;
