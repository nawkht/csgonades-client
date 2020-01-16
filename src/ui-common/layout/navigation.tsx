import { FC } from "react";
import { MapLink } from "./MapLink";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { isMobile } from "react-device-detect";

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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: left ${durations.transition}s;
          overflow-y: auto;
          background: white;
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
            position: absolute;
            top: ${uiDimensions.HEADER_HEIGHT}px;
            left: -${uiDimensions.SIDEBAR_WIDTH}px;
            bottom: 0;
            z-index: 999;
            border-right: 1px solid ${colors.PRIMARY_BORDER};
          }
        }
      `}</style>
    </>
  );
};

export { MapNavigation };
