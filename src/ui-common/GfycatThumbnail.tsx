import { FC, useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NadeApi } from "../api/NadeApi";
import { NadeLight } from "../models/Nade/Nade";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";

type Props = {
  nade: NadeLight;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const [isMountet, setIsMountet] = useState(false);
  const [seekPercentage, setSeekPercentage] = useState(0);
  const { ref, isHovering } = useHoverDelayedEvent(onViewEvent, 3000);

  useEffect(() => {
    setIsMountet(true);
    return () => setIsMountet(false);
  }, []);

  const measuredRef = useCallback(
    (node: HTMLVideoElement) => {
      if (node !== null) {
        node.playbackRate = 2;
        node.ontimeupdate = function() {
          if (isMountet) {
            const perc = (node.currentTime / node.duration) * 100;
            setSeekPercentage(perc);
          }
        };
        node.onpause = () => {
          if (isMountet) {
            setSeekPercentage(0);
          }
        };
      }
    },
    [isMountet]
  );

  function onViewEvent() {
    GoogleAnalytics.event("NadeItem", "Hover play gfycat", nade.id);
    NadeApi.registerView(nade.id);
  }

  return (
    <>
      <div className="player" ref={ref}>
        <div className="front">
          <LazyLoadImage
            effect="blur"
            alt={`nade thumbnail`}
            src={nade.images.thumbnailUrl} // use normal <img> attributes as props
            width={"100%"}
          />
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
            <div className="seek-bar">
              <div className="seek-progress" />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .player {
          position: relative;
          width: 100%;
          overflow: hidden;
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
        }

        .seek-bar {
          background: rgba(0, 0, 0, 0.3);
          height: 4px;
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          z-index: 900;
          border-radius: 4px;
          overflow: hidden;
        }

        .seek-progress {
          background: rgba(255, 255, 255, 0.75);
          height: 4px;
          width: ${seekPercentage}%;
          transition: width 0.5s;
          border-radius: 4px;
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
