import { FC } from "react";
import Link from "next/link";
import { UserNav } from "./UserNav";
import { Icon } from "semantic-ui-react";
import {
  useToogleNavigation,
  useTheme
} from "../../store/LayoutStore/LayoutHooks";

const Header: FC = () => {
  const { colors, sideBarOpen, uiDimensions } = useTheme();
  const toggleNavigation = useToogleNavigation();

  return (
    <>
      <header>
        <div className="logo-container">
          <div className="hamburger" onClick={toggleNavigation}>
            {sideBarOpen && <Icon name="cancel" size="large" />}
            {!sideBarOpen && <Icon name="bars" size="large" />}
          </div>

          <Link href="/" as="/">
            <a className="logo">
              <img src="/logo.png" alt="CSGO Nades logo" />
            </a>
          </Link>
        </div>

        <UserNav />
      </header>
      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
          margin-left: 18px;
        }

        .hamburger {
          margin-right: 18px;
          cursor: pointer;
          display: none;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: ${uiDimensions.HEADER_HEIGHT}px;
          display: flex;
          background: #fff;
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          z-index: 999;
          justify-content: space-between;
        }

        .logo {
          align-self: center;
        }

        .logo img {
          height: 35px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export { Header };
