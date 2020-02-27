import Link from "next/link";
import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { Dimensions } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { UserNav } from "./UserNav";

const Header: FC = () => {
  const { colors, theme } = useTheme();
  const { isNavOpen, toggleNav } = useNavigation();
  const logoUrl = theme === "light" ? "/logo.png" : "/logo-darkmode.png";

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <div className="hamburger" onClick={toggleNav}>
            {isNavOpen && <Icon name="cancel" size="large" />}
            {!isNavOpen && <Icon name="bars" size="large" />}
          </div>

          <Link href="/" as="/">
            <a className="logo">
              <img src={logoUrl} alt="CSGO Nades logo" />
            </a>
          </Link>
        </div>

        <div className="header-right">
          <UserNav />
        </div>
      </div>
      <style jsx>{`
        .logo-container {
          display: flex;
          align-items: center;
        }

        .hamburger {
          margin-right: 18px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
        }

        .header {
          height: ${Dimensions.HEADER_HEIGHT};
          display: flex;
          background: ${colors.DP02};
          border-bottom: 1px solid ${colors.BORDER};
          justify-content: space-between;
          padding: 0px ${Dimensions.GUTTER_SIZE};
        }

        .header-right {
          display: flex;
        }

        .logo {
          align-self: center;
          display: inline-block;
          max-width: 65px;
        }

        .logo img {
          width: 100%;
          display: block;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .hamburger {
            display: block;
          }

          .app-loading {
            display: none;
          }

          .header {
            padding: 0px ${Dimensions.PADDING_MEDIUM};
          }
        }
      `}</style>
    </>
  );
};

export { Header };
