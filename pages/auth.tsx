import React from "react";
import { NextPage } from "next";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { setToken } from "../src/store/AuthStore/AuthActions";

interface Props {
  authToken?: string;
}

const Auth: NextPage<Props> = props => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (props.authToken) {
      console.log("Dispatching set token");
      setToken(dispatch, props.authToken);
    }

    Router.push("/");
  }, []);

  return <h4>Signing in...</h4>;
};

Auth.getInitialProps = async ({ query }) => {
  const token = query.token as string;
  return {
    authToken: token || undefined
  };
};

export default Auth;
