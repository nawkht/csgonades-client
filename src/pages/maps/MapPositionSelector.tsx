import {
  FC,
  useState,
  useRef,
  useEffect,
  MouseEvent,
  useMemo,
  SyntheticEvent
} from "react";
import { MapCoordinates } from "../../models/Nade/Nade";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { Icon } from "semantic-ui-react";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { useCoordsForMap } from "../../store/NadeStore/NadeHooks";

type Props = {
  onDismiss: () => void;
  onClick: (coords: MapCoordinates) => void;
  map: CsgoMap;
};

export const MapPositionSelector: FC<Props> = ({ map, onClick, onDismiss }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawCoords = useCoordsForMap(map);
  const [elementOffset, setElementOffset] = useState({ left: 0, top: 0 });
  const [mapWidth, setMapWidth] = useState(0);

  const coords = useMemo(() => {
    const sizeRatio = 1024 / mapWidth;
    const relativeCoords = rawCoords.map(c => ({
      key: c.key,
      pos: {
        x: c.pos.x / sizeRatio,
        y: c.pos.y / sizeRatio
      }
    }));
    return relativeCoords;
  }, [rawCoords, mapWidth]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (ref.current) {
        setElementOffset({
          top: ref.current.offsetTop,
          left: ref.current.offsetLeft
        });
        setMapWidth(ref.current.offsetWidth);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  function onMapClick(event: MouseEvent<HTMLImageElement>) {
    const { left, top } = elementOffset;
    var x = event.clientX - left;
    var y = event.clientY - top;

    const sizeRatio = 1024 / mapWidth;

    const realX = Math.round(x * sizeRatio);
    const realY = Math.round(y * sizeRatio);

    GoogleAnalytics.event(
      "Nade filter",
      `By coords`,
      `${map}(${realX},${realY})`
    );

    onClick({
      x: realX,
      y: realY
    });
  }

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    console.log("> On image loaded");
    if (ref.current) {
      setElementOffset({
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft
      });
      setMapWidth(ref.current.offsetWidth);
    }
  }

  return (
    <>
      <div className="position-modal" onClick={onDismiss}>
        <div className="position-content">
          <div className="position-title">
            <span>CLICK ON THE MAP TO FIND NADES AT THE LOCATION</span>
            <span onClick={onDismiss}>
              <Icon name="cancel" />
            </span>
          </div>
          <div className="map-image" ref={ref}>
            <img
              src={`/mapsoverlays/${map}.jpg`}
              alt="CSGO Nades logo"
              onLoad={onImageLoad}
              onClick={onMapClick}
            />
            {coords.map(c => (
              <div
                key={c.key}
                className="point"
                style={{ top: c.pos.y - 5, left: c.pos.x - 5 }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .position-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          align-items: center;
          justify-content: space-around;
        }

        .position-content {
          display: block;
          background: white;
          border-radius: 4px;
          overflow: hidden;
        }

        .position-title {
          padding: 12px;
          font-size: 1.1em;
          display: flex;
          justify-content: space-between;
        }

        .map-image {
          position: relative;
        }

        .point {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #bdeb34;
          border: 1px solid black;
          pointer-events: none;
        }

        .position-content img {
          display: block;
          max-height: 70vh;
          max-width: 100%;
        }
      `}</style>
    </>
  );
};
