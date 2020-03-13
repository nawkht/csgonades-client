import { NextPage } from "next";
import { Dimmer, Loader } from "semantic-ui-react";
import { useOnSignIn } from "../store/AuthStore/AuthHooks";
import { withRedux } from "../utils/WithRedux";

const Auth: NextPage = () => {
  useOnSignIn();

  return (
    <Dimmer active>
      <Loader>Signing in...</Loader>
    </Dimmer>
  );
};

export default withRedux(Auth, { ssr: false });
