import { FC, useState } from "react";
import { useKeepAspectRatio } from "../utils/CommonHooks";

type Props = {
  imageUrl: string;
  gfyUrl: string;
};

export const GfycatThumbnail: FC<Props> = ({ imageUrl, gfyUrl }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { ref, height, width } = useKeepAspectRatio();

  function onHover() {
    setIsHovering(true);
  }

  function onUnHover() {
    setIsHovering(false);
  }

  return (
    <>
      <div
        className="player"
        ref={ref}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}
      >
        {!isHovering && (
          <div className="front" style={{ width: width, height: height }}>
            <img src={imageUrl} />
          </div>
        )}

        {isHovering && (
          <div className="back" style={{ width, height }}>
            <video autoPlay src={gfyUrl} />
          </div>
        )}
      </div>
      <style jsx>{`
        .player {
          width: 100%;
        }
        .front img {
          width: 100%;
        }
        .back video {
          width: 100%;
        }
      `}</style>
    </>
  );
};
