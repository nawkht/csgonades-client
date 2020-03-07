import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { Config, Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const SignInnButton: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <div className="steam-login-wrapper">
        <a className="steam-login" href={Config.SIGN_IN_URL} rel="nofollow">
          <div className="steam-logo">
            <Icon name="steam" />
          </div>
          <div className="steam-text">SIGN IN WITH STEAM</div>
        </a>
      </div>
      <style jsx>{`
        .steam-login-wrapper {
          display: flex;
          align-items: center;
        }

        .steam-login {
          display: flex;
          border-radius: 15px;
          align-items: center;
          color: white;
          transition: background 0.15s;
          background: #444;
          transition: background 0.2s;
          padding: 15px 20px;
        }

        .steam-logo {
          transition: transform 0.2s;
          margin-right: 10px;
          font-size: 24px;
        }

        .steam-text {
          font-weight: 300;
          font-size: 16px;
          white-space: nowrap;
          margin-right: 6px;
          align-self: center;
        }

        .steam-login:hover {
          background: #222;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .steam-login {
            padding: 10px 10px;
          }
          .steam-text {
            font-size: 14px;
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
