import { FC, useState, useEffect, useRef } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";

type Props = {
  nade: NadeLight;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  let hoverTimer: NodeJS.Timeout;
  let hoverEventTimer: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
      if (hoverEventTimer) {
        clearTimeout(hoverEventTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      hoverEventTimer = setTimeout(() => {
        GoogleAnalytics.event("NadeItem", "Hover play gfycat", nade.id);
      }, 3000);
    } else {
      if (hoverEventTimer) {
        clearTimeout(hoverEventTimer);
      }
    }
  }, [isHovering]);

  function onHover() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setIsHovering(true);
  }

  function onUnHover() {
    if (hoverEventTimer) {
      clearTimeout(hoverEventTimer);
    }

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
      >
        <div className="front">
          <img src={nade.images.thumbnailUrl} alt={`nade thumbnail`} />
        </div>

        {isHovering && (
          <div className="back">
            <video autoPlay={true} controls={false} muted={true}>
              <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
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
          background-repeat: no-repeat;
          background-position: center;
          background-size: 15%;
        }

        .front {
        }

        .front img {
          width: 100%;
        }

        .back {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .back video {
          width: 100%;
        }
      `}</style>
    </>
  );
};
