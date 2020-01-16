import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { UserNav } from "./UserNav";
import { Icon, Loader } from "semantic-ui-react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useIsLoadingNade } from "../../store/NadeStore/NadeSelectors";

const Header: FC = () => {
  const [loading, setIsLoading] = useState(false);
  const { colors, uiDimensions, layers } = useTheme();
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
              <img src="/logo.png" alt="CSGO Nades logo" />
            </a>
          </Link>
        </div>

        <div className="app-loading">
          <Loader active={loading} inline="centered" size="small" />
        </div>

        <UserNav />
      </div>
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

        .header {
          height: ${uiDimensions.HEADER_HEIGHT}px;
          display: flex;
          background: #fff;
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          justify-content: space-between;
        }

        .app-loading {
          position: fixed;
          left: 0;
          right: 0;
          height: ${uiDimensions.HEADER_HEIGHT}px;
          display: flex;
          align-items: center;
          pointer-events: none;
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
