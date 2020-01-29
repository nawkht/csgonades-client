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
          <div className="steam-text">Sign in</div>
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
          border: 1px solid ${colors.BORDER};
          background: rgba(0, 70, 89, 1);
          transition: background 0.2s;
        }

        .steam-logo {
          font-size: 1.5em;
          transition: transform 0.2s;
          position: relative;
          top: 1px;
          margin-right: 4px;
        }

        .steam-login:hover {
          background: rgba(1, 46, 59, 1);
        }

        .steam-login:hover .steam-logo {
          transform: scale(1.1);
        }

        .steam-text {
          white-space: nowrap;
          padding: 6px 6px 6px 12px;
        }
      `}</style>
    </>
  );
};
