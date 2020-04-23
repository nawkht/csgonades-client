import { FC } from "react";
import { FaSteam } from "react-icons/fa";
import { Config, Dimensions } from "../../constants/Constants";

export const SignInnButton: FC = () => {
  return (
    <>
      <div className="steam-login-wrapper">
        <a className="steam-login" href={Config.SIGN_IN_URL} rel="nofollow">
          <div className="steam-logo">
            <FaSteam />
          </div>
          <div className="steam-text">Sign in with STEAM</div>
        </a>
      </div>
      <style jsx>{`
        .steam-login-wrapper {
          display: flex;
          align-items: center;
        }

        .steam-login {
          display: flex;
          border-radius: 5px;
          align-items: center;
          color: white;
          transition: background 0.15s;
          background: #444;
          transition: background 0.2s;
          padding: 10px 15px;
        }

        .steam-logo {
          transition: transform 0.2s;
          margin-right: 10px;
          font-size: 20px;
          position: relative;
          top: 3px;
        }

        .steam-text {
          font-weight: 300;
          font-size: 14px;
          white-space: nowrap;
          align-self: center;
        }

        .steam-login:hover {
          background: #222;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .steam-login {
            border-radius: 5px;
            padding: 5px 10px;
          }

          .steam-text {
            font-size: 12px;
          }
        }
      `}</style>
      <style jsx global>{`
        .steam-logo i {
          display: inline;
        }
      `}</style>
    </>
  );
};
