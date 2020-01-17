import { NextPage } from "next";
import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { usePreloadUser } from "../src/store/AuthStore/AuthHooks";

interface Props {
  isFirstSignIn: boolean;
}

const Auth: NextPage<Props> = ({ isFirstSignIn }) => {
  const preloadUser = usePreloadUser();
  React.useEffect(() => {
    preloadUser(isFirstSignIn);
  }, []);

  return (
    <Dimmer active>
      <Loader>Signing in...</Loader>
    </Dimmer>
  );
};

Auth.getInitialProps = async ({ query }): Promise<Props> => {
  const isFirstSignIn = query.isFirstSignIn === "true" ? true : false;
  return {
    isFirstSignIn
  };
};

export default Auth;
