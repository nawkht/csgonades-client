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
  const { ref, isHovering } = useHoverEvent();
  const { videoRef, progress } = useVideoEvents({
    onStop: endProgress => {
      GoogleAnalytics.event(
        "NadeItem",
        `Preview viewed`,
        `Progress`,
        endProgress
      );
    },
    onConcideredViewed: () => {
      NadeApi.registerView(nade.id);
    }
  });

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
              ref={videoRef}
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
          width: ${progress}%;
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

type VideoEventCallbacks = {
  onStop: (pregress: number) => void;
  onConcideredViewed: () => void;
};

function useVideoEvents(callbacks: VideoEventCallbacks) {
  const [hasSentHalfViewed, setHasSentHalfViewed] = useState(false);
  const [hasSentStoppedWatching, setHasSentStoppedWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [didFinishPreview, setDidFinishPreview] = useState(false);
  const videoRef = useCallback(
    (node: HTMLVideoElement) => {
      if (node) {
        node.playbackRate = 2;
        node.ontimeupdate = function() {
          const perc = Math.round((node.currentTime / node.duration) * 100);
          setProgress(perc);

          if (perc >= 33 && !hasSentHalfViewed) {
            setHasSentHalfViewed(true);
            callbacks.onConcideredViewed();
          }

          if (perc >= 90) {
            setDidFinishPreview(true);
          }
        };
        node.onmouseleave = () => {
          if (!hasSentStoppedWatching) {
            if (progress < 25 && !didFinishPreview) {
              return;
            }
            setHasSentStoppedWatching(true);
            if (didFinishPreview) {
              callbacks.onStop(100);
            } else {
              const roundedProgress = Math.ceil(progress / 10) * 10;
              callbacks.onStop(roundedProgress);
            }
          }
        };
      }
    },
    [progress, hasSentHalfViewed, hasSentStoppedWatching, didFinishPreview]
  );

  return { videoRef, progress };
}

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
