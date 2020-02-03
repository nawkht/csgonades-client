import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NadeApi } from "../../api/NadeApi";
import { NadeLight } from "../../models/Nade/Nade";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { SeekBar } from "../SeekBar";

type Props = {
  nade: NadeLight;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const isAdmin = useIsAdmin();

  const { ref, isHovering } = useHoverEvent();
  const { videoRef, progress } = useVideoEvents({
    onStop: endProgress => {
      GoogleAnalytics.event({
        category: "NadeItem",
        action: `Preview viewed`,
        label: `${endProgress}%`,
        ignore: isAdmin
      });
    },
    onConcideredViewed: () => {
      NadeApi.registerView(nade.id);
    }
  });

  const videoIconClassName = useMemo(() => {
    const classes = ["video-icon-wrapper"];
    if (isHovering) {
      classes.push("hidden");
    }
    return classes.join(" ");
  }, [isHovering]);

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

        <div className={videoIconClassName}>
          <div className="video-icon">
            <FaVideo style={{ display: "block" }} />
          </div>
        </div>

        {isHovering && (
          <div className="back">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster={nade.images.thumbnailUrl}
            >
              <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
            </video>
            <SeekBar progress={progress} />
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
          background: ${nade.gfycat.avgColor || "black"};
        }

        .front {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .video-icon-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          padding: 2px 4px;
          border-radius: 3px;
          margin: 5px;
          z-index: 800;
          transition: opacity 0.15s;
        }

        .video-icon-wrapper.hidden {
          opacity: 0;
        }

        .video-icon {
          color: rgba(0, 0, 0, 0.5);
          font-size: 0.7em;
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
          opacity: 0;
          animation-name: revealVideo;
          animation-duration: 0.3s;
          animation-fill-mode: forwards;
        }

        .back video {
          width: 101%;
          display: block;
        }

        @keyframes revealVideo {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

type VideoEventCallbacks = {
  onStop: (pregress: number) => void;
  onConcideredViewed: () => void;
};

export function useVideoEvents(callbacks: VideoEventCallbacks) {
  const [node, setNode] = useState<HTMLVideoElement | null>(null);
  const [hasSentHalfViewed, setHasSentHalfViewed] = useState(false);
  const [hasSentStoppedWatching, setHasSentStoppedWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [didFinishPreview, setDidFinishPreview] = useState(false);

  const videoRef = useCallback((node: HTMLVideoElement) => {
    setNode(node);
  }, []);

  // Progress event listener
  useEffect(() => {
    if (!node) {
      return;
    }

    node.playbackRate = 2;

    const onTimeUpdate = () => {
      const perc = Math.round((node.currentTime / node.duration) * 100);
      setProgress(perc);
    };

    node.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      if (node) {
        node.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
  }, [node]);

  // Setup event listeners
  useEffect(() => {
    if (!node) {
      return;
    }

    const onMouseLeave = () => {
      if (!hasSentStoppedWatching) {
        if (progress < 25 && !didFinishPreview) {
          return;
        }
        setHasSentStoppedWatching(true);
        if (didFinishPreview) {
          console.log("Did finish full preview");
          callbacks.onStop(100);
        } else {
          const roundedProgress = Math.ceil(progress / 10) * 10;
          console.log("Stopped at", roundedProgress);
          callbacks.onStop(roundedProgress);
        }
      }
    };

    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (node) {
        node.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [node, hasSentStoppedWatching, progress, didFinishPreview]);

  // Progress event trigger
  useEffect(() => {
    if (progress >= 33 && !hasSentHalfViewed) {
      setHasSentHalfViewed(true);
      callbacks.onConcideredViewed();
    }

    if (progress >= 90) {
      setDidFinishPreview(true);
    }
  }, [progress, hasSentHalfViewed]);

  return { videoRef, progress };
}

function useHoverEvent() {
  const [isHovering, setIsHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    node.addEventListener("mouseenter", onMouseEnter);
    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (node) {
        node.removeEventListener("mouseenter", onMouseEnter);
        node.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return {
    ref,
    isHovering
  };
}
