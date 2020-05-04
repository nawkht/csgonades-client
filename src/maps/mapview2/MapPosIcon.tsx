import { FC, useMemo } from "react";
import { NadeLight } from "../../models/Nade/Nade";

type Props = {
  nade: NadeLight;
  mapWidth: number;
  onPress: (pos: { x: number; y: number }) => void;
};

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

  const scaledIconSize = mapWidth / 22;

  return (
    <>
      <div
        className="point"
        style={{
          top: position.y - scaledIconSize / 2,
          left: position.x - scaledIconSize / 2,
        }}
        onClick={onClick}
      >
        <img src={`/icons/grenades/${nade.type}.png`} />
      </div>
      <style jsx>{`
        .point {
          position: absolute;
          width: ${scaledIconSize}px;
          height: ${scaledIconSize}px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.7;
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
          z-index: 500;
        }
      `}</style>
    </>
  );
};
