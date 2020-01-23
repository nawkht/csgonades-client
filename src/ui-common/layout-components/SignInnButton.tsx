import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com/auth/steam"
    : "http://localhost:5000/auth/steam";

export const SignInnButton: FC = () => {
  const { uiDimensions } = useTheme();
  return (
    <>
      <div className="steam-login-wrapper">
        <a className="steam-login" href={AUTH_URL} rel="nofollow">
          <div className="steam-content">
            <div className="steam-header">
              Sign in through <span>STEAM</span>
            </div>
            <div className="steam-notice">
              This site not accosiated with Valve Corp.
            </div>

            <div className="steam-logo">
              <Icon name="steam" />
            </div>
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
          margin-right: 18px;
          border-radius: 8px;
          align-items: center;
          color: white;
          transition: background 0.15s;
          overflow: hidden;
          opacity: 0.95;
        }

        .steam-login:hover {
          opacity: 1;
        }

        .steam-login:hover .steam-logo {
          transform: scale(1.1);
        }

        .steam-content {
          position: relative;
        }

        .steam-logo {
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          bottom: 0;
          top: 0;
          font-size: 2em;
          line-height: 1em;
          padding-right: 6px;
          transform: scale(1);
          transition: transform 0.3s;
          padding-top: 2px;
        }

        .steam-header {
          background: rgba(34, 34, 34, 1);
          padding: 6px 56px 3px 12px;
        }

        .steam-header span {
          font-weight: normal;
        }

        .steam-notice {
          background: rgba(56, 56, 56, 1);
          font-size: 0.6em;
          color: rgba(255, 255, 255, 0.8);
          padding: 0px 0px 3px 12px;
        }
      `}</style>
    </>
  );
};
