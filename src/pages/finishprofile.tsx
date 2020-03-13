import { NextPage } from "next";
import { FinishProfile } from "../finishprofile/FinishProfile";
import { Layout2 } from "../layout/Layout2";
import { useSignedInUser } from "../store/AuthStore/AuthHooks";
import { withRedux } from "../utils/WithRedux";

type Props = {};

const FinishProfilePage: NextPage<Props> = ({}) => {
  const user = useSignedInUser();

  return (
    <Layout2 title="Finish profile">
      {user && <FinishProfile user={user} />}
    </Layout2>
  );
};

export default withRedux(FinishProfilePage, { ssr: false });
