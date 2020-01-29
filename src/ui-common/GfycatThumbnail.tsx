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
  const [sentViewedEvent, setSentViewedEvent] = useState(false);
  const [sentProgressEvent25, setSentProgressEvent25] = useState(false);
  const [sentProgressEvent50, setSentProgressEvent50] = useState(false);
  const [sentProgressEvent100, setSentProgressEvent100] = useState(false);
  const [isMountet, setIsMountet] = useState(false);
  const [seekPercentage, setSeekPercentage] = useState(0);
  const { ref, isHovering } = useHoverEvent();

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
            if (perc >= 50 && !sentViewedEvent) {
              onViewEvent();
            }

            if (perc >= 25 && !sentProgressEvent25) {
              onProgressEvent(25);
              setSentProgressEvent25(true);
            }
            if (perc >= 50 && !sentProgressEvent50) {
              onProgressEvent(50);
              setSentProgressEvent50(true);
            }
            if (perc >= 95 && !sentProgressEvent100) {
              onProgressEvent(100);
              setSentProgressEvent100(true);
            }
          }
        };
        node.onpause = () => {
          if (isMountet) {
            setSeekPercentage(0);
          }
        };
      }
    },
    [
      isMountet,
      sentViewedEvent,
      sentProgressEvent25,
      sentProgressEvent50,
      sentProgressEvent100
    ]
  );

  function onViewEvent() {
    NadeApi.registerView(nade.id);
    setSentViewedEvent(true);
  }

  function onProgressEvent(percentage: number) {
    GoogleAnalytics.event("NadeItem", `Preview viewed ${percentage}%`, nade.id);
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

function useHoverEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHover] = useState(false);

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.onmouseenter = onHover;
      div.onmouseleave = onUnHover;
    }
  }, [ref]);

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
