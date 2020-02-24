import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { Config } from "../../constants/Constants";
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
          border-radius: 8px;
          align-items: center;
          color: white;
          transition: background 0.15s;
          background: ${colors.primaryBtnBg};
          transition: background 0.2s;
          padding: 12px;
        }

        .steam-logo {
          font-size: 2.2em;
          transition: transform 0.2s;
          margin-right: 6px;
        }

        .steam-text {
          font-weight: normal;
          white-space: nowrap;
          margin-right: 6px;
          align-self: center;
        }

        .steam-login:hover {
          background: ${colors.primaryBtnHover};
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
