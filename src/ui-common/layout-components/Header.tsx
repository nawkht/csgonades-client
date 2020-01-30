import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Icon, Loader } from "semantic-ui-react";
import { Dimensions } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useIsLoadingNade } from "../../store/NadeStore/NadeSelectors";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Logo } from "../svgs/Logo";
import { UserNav } from "./UserNav";

const Header: FC = () => {
  const [loading, setIsLoading] = useState(false);
  const { colors, theme } = useTheme();
  const { isNavOpen, toggleNav } = useNavigation();
  const isLoading = useIsLoadingNade();
  let timer: NodeJS.Timer;

  // If loading takes for than 500ms show loader
  useEffect(() => {
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 500);
    } else {
      setIsLoading(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

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
              <Logo />
            </a>
          </Link>
        </div>

        <div className="app-loading">
          <Loader active={loading} inline="centered" size="small" />
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

        .app-loading {
          position: fixed;
          left: 0;
          right: 0;
          height: ${Dimensions.HEADER_HEIGHT};
          display: flex;
          align-items: center;
          pointer-events: none;
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
