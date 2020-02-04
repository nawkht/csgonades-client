import { NextPage } from "next";
import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { usePreloadUser } from "../src/store/AuthStore/AuthHooks";

const Auth: NextPage = () => {
  const preloadUser = usePreloadUser();
  React.useEffect(() => {
    preloadUser();
  }, []);

  return (
    <Dimmer active>
      <Loader>Signing in...</Loader>
    </Dimmer>
  );
};

export default Auth;
