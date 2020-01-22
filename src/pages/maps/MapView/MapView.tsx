import { FC, SyntheticEvent, useMemo, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import {
  useNadeCoordinatesForMap,
  useNadeFilter
} from "../../../store/NadeStore/NadeHooks";
import { useMapViewTip } from "../../../store/TipStore/TipHooks";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";
import { MapPosIcon } from "./MapPosIcon";

type Props = {
  map: CsgoMap;
};

export const MapView: FC<Props> = ({ map }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visisble, setVisisble] = useState(false);
  const [mapLoaded, setMapLoade] = useState(false);
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadeCoordinatesForMap(map);
  const { uiDimensions, colors } = useTheme();
  const { filterByMapCoords } = useNadeFilter(map);
  const { hasOpenedMapView, didOpenMapView } = useMapViewTip();

  const wrapperClassName = useMemo(() => {
    const classes = ["mapview-wrapper"];
    if (visisble) {
      classes.push("visisble");
    }
    return classes.join(" ");
  }, [visisble, hasOpenedMapView]);

  const tabClassName = useMemo(() => {
    const classes = ["mapview-tab"];
    if (visisble) {
      classes.push("active");
    }
    if (!hasOpenedMapView) {
      classes.push("tab-hint-animated");
    }
    return classes.join(" ");
  }, [visisble, hasOpenedMapView]);

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (ref.current) {
      setMapWidth(ref.current.offsetWidth);
      setMapLoade(true);
    }
  }

  function onNadeClick(pos: { x: number; y: number }) {
    filterByMapCoords(pos);
    setVisisble(false);
    GoogleAnalytics.event("MapView", "Click nade");
  }

  function onHandleClick() {
    if (visisble) {
      setVisisble(false);
      didOpenMapView();
      GoogleAnalytics.event("MapView", "Close mapview");
    } else {
      setVisisble(true);
      GoogleAnalytics.event("MapView", "Open mapview");
    }
  }
  return (
    <>
      <div className={wrapperClassName}>
        <div ref={ref} className="mapview-map">
          <img
            src={`/mapsoverlays/${map}.jpg`}
            alt="Map overview image"
            onLoad={onImageLoad}
          />
          {mapLoaded &&
            nades.map(n => (
              <MapPosIcon
                key={n.id}
                nade={n}
                mapWidth={mapWidth}
                onPress={onNadeClick}
              />
            ))}

          <div className={tabClassName} onClick={onHandleClick}>
            <Icon name={visisble ? "cancel" : "map outline"} size="large" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .mapview-wrapper {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: ${uiDimensions.SIDEBAR_WIDTH}px;
          bottom: 0;
          display: flex;
          align-items: center;
          width: 80vh;
          transform: translateX(-100%);
          transition: transform 0.3s;
          z-index: 900;
          pointer-events: none;
        }

        .tab-hint-animated {
          animation-name: tabHint;
          animation-duration: 20s;
          animation-delay: 5s;
          animation-iteration-count: infinite;
        }

        .visisble {
          transform: translateX(0px);
        }

        .mapview-tab {
          background: ${colors.PRIMARY_75_PERCENT};
          padding: 25px 5px;
          position: absolute;
          left: 100%;
          top: calc(50%);
          color: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          pointer-events: all;
          transform: translateY(-50%) scale(1);
          cursor: pointer;
          transition: background 0.15s;
        }

        .mapview-tab:hover {
          background: ${colors.PRIMARY};
        }

        .mapview-tab.active {
          background: rgba(194, 43, 43, 0.75);
        }

        .mapview-tab.active:hover {
          background: rgba(194, 43, 43, 1);
        }

        .mapview-map {
          position: relative;
          width: 100%;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          pointer-events: all;
        }

        .mapview-map img {
          width: 100%;
          display: block;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          pointer-events: all;
        }

        @keyframes tabHint {
          0% {
            background: ${colors.PRIMARY_75_PERCENT};
            transform: translateY(-50%) scale(1);
          }
          2.5% {
            background: ${colors.SUCCESS_90};
            transform: translateY(-50%) scale(1.15);
          }
          5% {
            background: ${colors.PRIMARY_75_PERCENT};
            transform: translateY(-50%) scale(1.05);
          }
          7.5% {
            background: ${colors.SUCCESS_90};
            transform: translateY(-50%) scale(1.15);
          }
          10% {
            background: ${colors.PRIMARY_75_PERCENT};
            transform: translateY(-50%) scale(1);
          }
          90% {
            background: ${colors.PRIMARY_75_PERCENT};
            transform: translateY(-50%) scale(1);
          }
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .mapview-wrapper {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
