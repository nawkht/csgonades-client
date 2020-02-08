import { FC, useMemo, useRef, useState } from "react";
import { Dimensions } from "../../../constants/Constants";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeFilterStore/NadeFilterHooks";
import { useNadeCoordinatesForMap } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { useMapViewTip } from "../../../store/TipStore/TipHooks";
import { Filters } from "./Filters";
import { MapPosIcon } from "./MapPosIcon";

type Props = {
  map: CsgoMap;
};

export const MapView: FC<Props> = ({ map }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visisble, setVisisble] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadeCoordinatesForMap(map);
  const { colors } = useTheme();
  const { filterByMapCoords } = useNadeFilter();
  const { didOpenMapView } = useMapViewTip();

  const wrapperClassName = useMemo(() => {
    const classes = ["mapview-wrapper"];
    if (visisble) {
      classes.push("visisble");
    }
    return classes.join(" ");
  }, [visisble]);

  function onImageLoad() {
    if (ref.current) {
      setMapLoaded(true);
      setMapWidth(ref.current.offsetWidth);
    }
  }

  function onNadeClick(pos: { x: number; y: number }) {
    filterByMapCoords(pos);
    setVisisble(false);
  }

  function onHandleClick() {
    if (visisble) {
      setVisisble(false);
      didOpenMapView();
    } else {
      setVisisble(true);
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
          top: calc(${Dimensions.HEADER_HEIGHT} + ${Dimensions.GUTTER_SIZE});
          left: ${Dimensions.SIDEBAR_WIDTH};
          bottom: ${Dimensions.GUTTER_SIZE};
          transform: translateX(-100%);
          transition: transform 0.3s;
          z-index: 900;
        }}

        .mapview-map {
          height: 80vh;
          width: 80vh;
          border: 1px solid ${colors.BORDER};
          border-left: none;
          border-bottom-right-radius: 10px;
        }

        .mapview-img {
          display: block;
          border-bottom-right-radius: 4px;
          width: 100%;
        }

        .filter-bar {
          position: absolute;
          top: 1px;
          bottom: 0;
          left: calc(100% - 1px);
        }

        .visisble {
          transform: translateX(0px);
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .mapview-wrapper {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
