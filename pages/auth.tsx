import React from "react";
import { NextPage } from "next";
import { usePreloadUser } from "../src/store/AuthStore/AuthHooks";

interface Props {
  isFirstSignIn: boolean;
}

const Auth: NextPage<Props> = ({ isFirstSignIn }) => {
  const preloadUser = usePreloadUser();
  React.useEffect(() => {
    preloadUser(isFirstSignIn);
  }, []);

  return <h4>Signing in...</h4>;
};

Auth.getInitialProps = async ({ query }): Promise<Props> => {
  const isFirstSignIn = query.isFirstSignIn === "true" ? true : false;
  return {
    isFirstSignIn
  };
};

export default Auth;
