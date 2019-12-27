import React from "react";
import { NextPage } from "next";
import Router from "next/router";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUser,
  signOutUser
} from "../src/store/AuthStore/AuthActions";
import { UserApi } from "../src/api/UserApi";
import { AuthApi } from "../src/api/TokenApi";

interface Props {
  isFirstSignIn: boolean;
}

const Auth: NextPage<Props> = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    AuthApi.refreshToken()
      .then(accessToken => {
        setToken(dispatch, accessToken);
        UserApi.fetchSelf(accessToken)
          .then(user => {
            setUser(dispatch, user);
            Router.push("/");
          })
          .catch(err => {
            console.error("Failed to fetch user", err.message);
            Router.push("/");
          });
      })
      .catch(err => {
        console.error("Failed", err.message);
        dispatch(signOutUser());
        Router.push("/");
      });
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
