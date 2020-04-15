import { useRouter } from "next/router";
import { FC, memo, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { ThemeToggler } from "../Misc/ThemeToggler";
import { MobileMapLink } from "./MobileMapLink";

type Props = {};

export const MobileNav: FC<Props> = memo(({}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { toggleNav } = useNavigation();
  const { isNavOpen } = useNavigation();

  const currentRoute = router.query.name;

  const mobileNavClassName = useMemo(() => {
    if (isNavOpen) {
      return "open";
    }
  }, [isNavOpen]);

  return (
    <>
      <aside id="mobile-navigation" className={mobileNavClassName}>
        <nav>
          <div className="exit-nav" onClick={toggleNav}>
            <FaTimes />
          </div>
          <ul>
            <MobileMapLink mapName="dust2" currentMapPath={currentRoute} />
            <MobileMapLink mapName="mirage" currentMapPath={currentRoute} />
            <MobileMapLink mapName="inferno" currentMapPath={currentRoute} />
            <MobileMapLink mapName="overpass" currentMapPath={currentRoute} />
            <MobileMapLink mapName="train" currentMapPath={currentRoute} />
            <MobileMapLink mapName="cache" currentMapPath={currentRoute} />
            <MobileMapLink mapName="nuke" currentMapPath={currentRoute} />
            <MobileMapLink mapName="vertigo" currentMapPath={currentRoute} />
            <MobileMapLink mapName="anubis" currentMapPath={currentRoute} />
          </ul>
          <div className="theme-toggle">
            <ThemeToggler />
          </div>
        </nav>
      </aside>
      <style jsx>{`
        #mobile-navigation {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 999;
          border-right: 1px solid ${colors.BORDER};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
          overflow-x: hidden;
          background: ${colors.DP01};
        }

        #mobile-navigation {
          transform: translateX(-100%);
          transition: transform ${AnimationTimings.fast};
        }

        #mobile-navigation.open {
          transform: translateX(0);
        }

        #mobile-navigation {
          display: none;
        }

        .exit-nav {
          padding-left: 16px;
          padding-top: 18px;
          padding-bottom: 16px;
          color: ${colors.TEXT};
          font-size: 30px;
        }

        nav {
          display: flex;
          flex-direction: column;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .theme-toggle {
          position: relative;
          top: 20px;
          left: 55px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          #mobile-navigation {
            display: block;
          }
        }
      `}</style>
    </>
  );
});
