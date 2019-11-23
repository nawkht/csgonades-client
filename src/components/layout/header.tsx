import { FC } from "react";
import Link from "next/link";
import { Colors } from "../../../constants/colors";
import { UiConstants } from "../../../constants/ui";

const Header: FC = () => {
  return (
    <>
      <header>
        <Link href="/">
          <a className="logo">
            <img src="/logo.png" />
          </a>
        </Link>
        <a href="http://localhost:5000/auth/steam" className="steam-login">
          Loginz
        </a>
      </header>
      <style jsx>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: ${UiConstants.HEADER_HEIGHT}px;
          display: flex;
          background: #fff;
          border-bottom: 1px solid ${Colors.PRIMARY_BORDER};
          z-index: 999;
        }

        .logo {
          align-self: center;
          padding-left: 16px;
        }

        .logo img {
          height: 30px;
        }
      `}</style>
    </>
  );
};

export { Header };
