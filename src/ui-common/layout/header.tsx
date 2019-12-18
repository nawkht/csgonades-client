import { FC } from "react";
import Link from "next/link";
import { Colors } from "../../../constants/colors";
import { UiConstants } from "../../../constants/ui";
import { UserNav } from "./UserNav";

const Header: FC = () => {
  return (
    <>
      <header>
        <Link href="/">
          <a className="logo">
            <img src="/logo.png" />
          </a>
        </Link>
        <UserNav />
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
          justify-content: space-between;
        }

        .logo {
          align-self: center;
          padding-left: 18px;
        }

        .logo img {
          height: 35px;
        }
      `}</style>
    </>
  );
};

export { Header };
