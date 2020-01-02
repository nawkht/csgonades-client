import { FC, useState, useEffect, useRef, useMemo } from "react";
import useComponentSize from "@rehooks/component-size";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

type Props = {
  imageUrl: string;
  gfyUrl: string;
};

export const GfycatThumbnail: FC<Props> = ({ imageUrl, gfyUrl }) => {
  const { colors } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const { width } = useComponentSize(ref);
  const height = useMemo(() => width / (16 / 9), [width]);
  let hoverTimer: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, []);

  function onHover() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setIsHovering(true);
  }

  function onUnHover() {
    hoverTimer = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  }

  return (
    <>
      <div
        className="player"
        ref={ref}
        onMouseEnter={onHover}
        onMouseLeave={onUnHover}
        style={{ height }}
      >
        <div className="front" style={{ width: width, height: height }}>
          <img src={imageUrl} alt={`nade thumbnail`} />
        </div>

        {isHovering && (
          <div className="back" style={{ width, height }}>
            <video autoPlay={true} controls={false} muted={true}>
              <source src={gfyUrl} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
      <style jsx>{`
        .player {
          position: relative;
          width: 100%;
          overflow: hidden;
          z-index: 998;
          background: #bbb url("/icons/loading.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 15%;
        }

        .player:hover .front {
          opacity: 0;
        }

        .front {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .front img {
          width: 101%;
        }
        .back video {
          width: 101%;
        }
      `}</style>
    </>
  );
};
