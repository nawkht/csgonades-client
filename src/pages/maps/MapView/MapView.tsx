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
  const { uiDimensions } = useTheme();
  const { filterByMapCoords } = useNadeFilter(map);
  const { hasOpenedMapView, didOpenMapView } = useMapViewTip();

  const wrapperClassName = useMemo(() => {
    const classes = ["mapview-wrapper"];
    if (visisble) {
      classes.push("visisble");
    }
    if (!hasOpenedMapView) {
      classes.push("hint-animate");
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
    GoogleAnalytics.event("MapView", "Click nade");
    filterByMapCoords(pos);
    setVisisble(false);
  }

  function onHandleClick() {
    if (visisble) {
      GoogleAnalytics.event("MapView", "Open mapview");
      setVisisble(false);
      didOpenMapView();
    } else {
      GoogleAnalytics.event("MapView", "Close mapview");
      setVisisble(true);
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

          <div className="mapview-tab" onClick={onHandleClick}>
            <Icon
              name={visisble ? "chevron left" : "chevron right"}
              size="large"
            />
          </div>

          <div className="close-btn" onClick={onHandleClick}>
            <Icon name="cancel" size="large" />
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

        .hint-animate {
          animation-name: hintAnimate;
          animation-duration: 0.75s;
          animation-delay: 5s;
        }

        .visisble {
          transform: translateX(0px);
        }

        .mapview-tab {
          background: #151515;
          padding: 20px 0px;
          position: absolute;
          left: 100%;
          top: calc(50%);
          color: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          pointer-events: all;
          transform: translateY(-50%);
          cursor: pointer;
          transition: background 0.15s;
        }

        .mapview-tab:hover {
          background: #151515;
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

        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          color: rgba(0, 0, 0);
          background: rgba(168, 50, 50, 0.5);
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-left: 2px;
          padding-top: 1px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .close-btn:hover {
          background: rgba(168, 50, 50, 1);
        }

        @keyframes hintAnimate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(-95%);
          }
          100% {
            transform: translateX(-100%);
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
