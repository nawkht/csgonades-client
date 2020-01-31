import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com/auth/steam"
    : "http://localhost:5000/auth/steam";

export const SignInnButton: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <div className="steam-login-wrapper">
        <a className="steam-login" href={AUTH_URL} rel="nofollow">
          <div className="steam-text">SIGN IN</div>
          <div className="steam-logo">
            <Icon name="steam" />
          </div>
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
          padding: 10px 18px;
        }

        .steam-logo {
          font-size: 1.5em;
          transition: transform 0.2s;
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

        .steam-login:hover .steam-logo {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};
