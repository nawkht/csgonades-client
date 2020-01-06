import { FC, useState, useEffect, useRef, useCallback } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";
import { NadeApi } from "../api/NadeApi";

type Props = {
  nade: NadeLight;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const { ref, isHovering } = useHoverDelayedEvent(onViewEvent, 5000);

  const measuredRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) {
      node.playbackRate = 1;
    }
  }, []);

  function onViewEvent() {
    GoogleAnalytics.event("NadeItem", "Hover play gfycat", nade.id);
    NadeApi.registerView(nade.id);
  }

  return (
    <>
      <div className="player" ref={ref}>
        <div className="front">
          <img src={nade.images.thumbnailUrl} alt={`nade thumbnail`} />
        </div>

        {isHovering && (
          <div className="back">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              ref={measuredRef}
              poster={nade.images.thumbnailUrl}
            >
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
          display: block;
          padding-top: 56.25%;
          background: black;
        }

        .front {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 901;
        }

        .front img {
          width: 100%;
          display: block;
        }

        .back {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 902;
        }

        .back video {
          width: 100%;
          display: block;
        }
      `}</style>
    </>
  );
};

function useHoverDelayedEvent(cb: Function, delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHover] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.onmouseenter = onHover;
      div.onmouseleave = onUnHover;
    }
  }, [ref]);

  useEffect(() => {
    if (!isHovering) {
      clearTimeout(timer);
    }
    if (isHovering && !hasFired) {
      timer = setTimeout(() => {
        cb();
        setHasFired(true);
      }, delay);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isHovering, hasFired]);

  function onHover() {
    setIsHover(true);
  }

  function onUnHover() {
    setIsHover(false);
  }

  return {
    ref,
    isHovering
  };
}
