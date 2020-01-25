import {
  FC,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import {
  useNadeCoordinatesForMap,
  useNadeFilter
} from "../../../store/NadeStore/NadeHooks";
import { useMapViewTip } from "../../../store/TipStore/TipHooks";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";
import { Filters } from "./Filters";
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

  useEffect(() => {
    let timer = setTimeout(() => {
      if (ref.current) {
        setMapLoade(true);
        setMapWidth(ref.current.offsetWidth);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      setMapLoade(true);
      setMapWidth(ref.current.offsetWidth);
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
            className="mapview-img"
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

          <div className="filter-bar">
            <Filters
              onOpenOpen={onHandleClick}
              map={map}
              mapViewIsOpen={visisble}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .mapview-wrapper {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT + uiDimensions.INNER_GUTTER_SIZE}px;
          left: ${uiDimensions.SIDEBAR_WIDTH}px;
          bottom: ${uiDimensions.INNER_GUTTER_SIZE}px;
          transform: translateX(-100%);
          transition: transform 0.3s;
          z-index: 900;
        }}

        .mapview-map {
          height: 80vh;
          width: 80vh;
        }

        .mapview-img {
          display: block;
          border-bottom-right-radius: 4px;
          width: 100%;
        }

        .filter-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 100%;
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

        @media only screen and (max-width: ${
          uiDimensions.MOBILE_THRESHHOLD
        }px) {
          .mapview-wrapper {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
