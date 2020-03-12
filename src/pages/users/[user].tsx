import { NextPage } from "next";
import { startEditingUserAction } from "../../store/UsersStore/UsersActions";
import { userErrorSelector } from "../../store/UsersStore/UsersSelectors";
import {
  fetchNadesForUserAction,
  fetchUserAction,
} from "../../store/UsersStore/UsersThunks";
import { UserPage } from "../../users/UsersPage";
import { withRedux } from "../../utils/WithRedux";

const UserPageComponent: NextPage = () => {
  return <UserPage />;
};

UserPageComponent.getInitialProps = async ({ reduxStore, query, res }) => {
  const { dispatch, getState } = reduxStore;
  const steamId = query.user as string;
  const shouldDisplayEdit = query.edit === "true";

  await Promise.all([
    //@ts-ignore
    dispatch(fetchUserAction(steamId)),
    //@ts-ignore
    dispatch(fetchNadesForUserAction(steamId)),
  ]);

  const error = userErrorSelector(getState());

  if (error && res) {
    res.statusCode = 404;
  }

  if (shouldDisplayEdit) {
    dispatch(startEditingUserAction());
  }

  return;
};

export default withRedux(UserPageComponent);
