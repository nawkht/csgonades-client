import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaVideo } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NadeLight } from "../../models/Nade/Nade";
import { useAnalyticsEvent } from "../../store/Analytics/AnalyticsActions";
import { useRegisterView } from "../../store/NadeStore/NadeHooks";
import { SeekBar } from "../SeekBar";

type Props = {
  nade: NadeLight;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const analyticsEvent = useAnalyticsEvent();
  const registerNadeView = useRegisterView();
  const [hovering, setHovering] = useState(false);
  const [progressForEvent, setProgressForEvent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasSentViewedEvent, setHasSentViewedEvent] = useState(false);
  const [hasSentAnalyticsEvent, setHasSentAnalyticsEvent] = useState(false);

  useEffect(() => {
    if (!hasSentViewedEvent && progress > 30) {
      registerNadeView(nade.id);
      setHasSentViewedEvent(true);
    }
  }, [progress, hasSentViewedEvent, nade]);

  const videoIconClassName = useMemo(() => {
    const classes = ["video-icon-wrapper"];
    if (hovering) {
      classes.push("hidden");
    }
    return classes.join(" ");
  }, [hovering]);

  function onVideoTimeUpdate({
    currentTarget,
  }: SyntheticEvent<HTMLVideoElement, Event>) {
    const { currentTime, duration } = currentTarget;
    const progressPercentage = Math.round((currentTime / duration) * 100);
    setProgress(progressPercentage);
    if (progressPercentage > 30 && progressPercentage > progressForEvent) {
      setProgressForEvent(progressPercentage);
    }
  }

  const onVideoMouseLeave = useCallback(() => {
    if (hasSentAnalyticsEvent || !progressForEvent) {
      return;
    }

    const roundedProgress = Math.ceil(progressForEvent / 10) * 10;

    analyticsEvent({
      category: "nadeitem",
      action: "PREVIEW_VIEWED",
      label: `${roundedProgress}%`,
    });
    setHasSentAnalyticsEvent(true);
  }, [hasSentAnalyticsEvent, progressForEvent, analyticsEvent]);

  const onLoad = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    e.currentTarget.playbackRate = 3;
  };

  function onMouseEnter() {
    setHovering(true);
  }

  function onMouseLeave() {
    setHovering(false);
  }

  return (
    <>
      <div
        className="player"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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

        {hovering && (
          <div className="back">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster={nade.images.thumbnailUrl}
              onTimeUpdate={onVideoTimeUpdate}
              onMouseLeave={onVideoMouseLeave}
              onLoadStart={onLoad}
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
