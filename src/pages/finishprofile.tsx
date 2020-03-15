import { NextPage } from "next";
import { FinishProfile } from "../finishprofile/FinishProfile";
import { useSignedInUser } from "../store/AuthStore/AuthHooks";

type Props = {};

const FinishProfilePage: NextPage<Props> = ({}) => {
  const user = useSignedInUser();

  return <>{user && <FinishProfile user={user} />}</>;
};

export default FinishProfilePage;
