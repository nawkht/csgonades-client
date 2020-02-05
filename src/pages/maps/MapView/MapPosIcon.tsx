import { FC, useMemo } from "react";
import { NadeLight } from "../../../models/Nade/Nade";

type Props = {
  nade: NadeLight;
  mapWidth: number;
  onPress: (pos: { x: number; y: number }) => void;
};

const ICON_SIZE = 30;

export const MapPosIcon: FC<Props> = ({ nade, mapWidth, onPress }) => {
  const position = useMemo(() => {
    const sizeRatio = 1024 / mapWidth;
    const { mapEndCoord } = nade;
    return {
      x: mapEndCoord ? mapEndCoord.x / sizeRatio : 0,
      y: mapEndCoord ? mapEndCoord.y / sizeRatio : 0,
    };
  }, [nade, mapWidth]);

  function onClick() {
    if (nade.mapEndCoord) {
      onPress({
        x: nade.mapEndCoord.x,
        y: nade.mapEndCoord.y,
      });
    }
  }

  return (
    <>
      <div
        className="point"
        style={{
          top: position.y - ICON_SIZE / 2,
          left: position.x - ICON_SIZE / 2,
        }}
        onClick={onClick}
      >
        <img src={`/icons/grenades/${nade.type}.png`} />
      </div>
      <style jsx>{`
        .point {
          position: absolute;
          width: ${ICON_SIZE}px;
          height: ${ICON_SIZE}px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.75;
          transform: scale(1);
          transition: opacity 0.2s, transform 0.2s;
          cursor: pointer;
          pointer-events: all;
        }

        .point img {
          width: 100%;
        }

        .point:hover {
          transform: scale(1.1);
          opacity: 1;
          z-index: 999;
        }
      `}</style>
    </>
  );
};
