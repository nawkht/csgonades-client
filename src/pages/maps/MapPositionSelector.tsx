import { FC, useState, useRef, useEffect, MouseEvent, useMemo } from "react";
import { MapCoordinates } from "../../models/Nade/Nade";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { Icon } from "semantic-ui-react";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

type Props = {
  onDismiss: () => void;
  onClick: (coords: MapCoordinates) => void;
  map: CsgoMap;
};

export const MapPositionSelector: FC<Props> = ({ map, onClick, onDismiss }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementOffset, setElementOffset] = useState({ left: 0, top: 0 });
  const [mapWidth, setMapWidth] = useState(0);

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

  return (
    <>
      <div className="position-modal">
        <div className="position-content">
          <div className="position-title">
            CLICK ON THE MAP TO FIND NADES AT THE LOCATION{" "}
            <span onClick={onDismiss}>
              <Icon name="cancel" />
            </span>
          </div>
          <div className="map-image" ref={ref}>
            <img
              src={`/mapsoverlays/${map}.jpg`}
              alt="CSGO Nades logo"
              onClick={onMapClick}
            />
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
        }

        .position-title {
          padding: 12px;
          font-size: 1.3em;
          text-align: center;
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
        }

        .position-content img {
          display: block;
          max-height: 70vh;
          max-width: 100%;
        }

        .btns {
          display: flex;
        }
      `}</style>
    </>
  );
};
