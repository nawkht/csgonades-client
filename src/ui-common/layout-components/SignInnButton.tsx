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
      <div className="steam-login">
        <a href={AUTH_URL}>
          <Icon name="steam" />
          <span>SIGN IN THROUGH STEAM</span>
        </a>
      </div>
      <style jsx>{`
        .steam-login {
          display: flex;
          align-items: center;
          padding-right: 12px;
          opacity: 0.85;
          transition: opacity 0.2s;
        }

        .steam-login:hover {
          opacity: 1;
        }

        .steam-login a {
          display: inline-block;
          padding: 6px 12px;
          background: #222;
          color: white;
          border-radius: ${uiDimensions.BORDER_RADIUS};
        }

        .steam-login span {
          margin-left: 6px;
        }
      `}</style>
    </>
  );
};
