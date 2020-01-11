import { FC, useMemo } from "react";
import { NadeLight } from "../../models/Nade/Nade";

type Props = {
  nade: NadeLight;
  mapWidth: number;
};

const ICON_SIZE = 20;

export const MapPosIcon: FC<Props> = ({ nade, mapWidth }) => {
  const position = useMemo(() => {
    const sizeRatio = 1024 / mapWidth;
    const { mapEndCoord } = nade;
    return {
      x: mapEndCoord ? mapEndCoord.x / sizeRatio : 0,
      y: mapEndCoord ? mapEndCoord.y / sizeRatio : 0
    };
  }, [nade, mapWidth]);

  return (
    <>
      <div
        className="point"
        style={{
          top: position.y - ICON_SIZE / 2,
          left: position.x - ICON_SIZE / 2
        }}
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
          transition: opacity 0.2s;
          transform: scale(1);
          animation-name: example;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }

        .point img {
          width: 100%;
        }

        @keyframes example {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};
