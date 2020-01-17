import { useRouter } from "next/router";
import { FC } from "react";
import { isMobile } from "react-device-detect";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { MapLink } from "./MapLink";

const MapNavigation: FC = () => {
  const { isNavOpen } = useNavigation();
  const { colors, uiDimensions, durations, layers } = useTheme();
  const router = useRouter();
  const currentRoute = router.query.name;

  const navClassName = isMobile ? (isNavOpen ? "open" : "closed") : "";

  return (
    <>
      <aside id="mapnavigation" className={navClassName}>
        <nav>
          <ul>
            <MapLink mapName="dust2" currentMapPath={currentRoute} />
            <MapLink mapName="mirage" currentMapPath={currentRoute} />
            <MapLink mapName="inferno" currentMapPath={currentRoute} />
            <MapLink mapName="overpass" currentMapPath={currentRoute} />
            <MapLink mapName="train" currentMapPath={currentRoute} />
            <MapLink mapName="cache" currentMapPath={currentRoute} />
            <MapLink mapName="nuke" currentMapPath={currentRoute} />
            <MapLink mapName="vertigo" currentMapPath={currentRoute} />
            <MapLink mapName="cobblestone" currentMapPath={currentRoute} />
          </ul>
        </nav>
      </aside>
      <style jsx>{`
        #mapnavigation {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: 0;
          bottom: 0;
          z-index: 999;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: left ${durations.transition}s;
          overflow-y: auto;
          background: white;
          width: ${uiDimensions.SIDEBAR_WIDTH}px;
        }

        .closed {
          left: -${uiDimensions.SIDEBAR_WIDTH}px !important;
        }

        .open {
          left: 0 !important;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          #mapnavigation {
            left: -${uiDimensions.SIDEBAR_WIDTH}px;
          }
        }
      `}</style>
    </>
  );
};

export { MapNavigation };
