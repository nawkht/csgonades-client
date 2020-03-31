import { FC, SyntheticEvent, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { useRegisterView } from "../../store/NadeStore/hooks/useRegisterView";
import { SeekBar } from "../SeekBar";
import { GfycatThumbnailControls } from "./GfycatThumbnailControls";
import { NadeItemFavBtn } from "./NadeItemFavBtn";

type Props = {
  nade: NadeLight | Nade;
};

export const GfycatThumbnail: FC<Props> = ({ nade }) => {
  const registerNadeView = useRegisterView();
  const [hovering, setHovering] = useState(false);
  const [progressForEvent, setProgressForEvent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasSentViewedEvent, setHasSentViewedEvent] = useState(false);

  useEffect(() => {
    if (!hasSentViewedEvent && progress > 30) {
      registerNadeView(nade.id);
      setHasSentViewedEvent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, hasSentViewedEvent, nade]);

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
              onLoadStart={onLoad}
            >
              <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
            </video>
            <SeekBar progress={progress} />
            <GfycatThumbnailControls />
            <NadeItemFavBtn nade={nade} />
          </div>
        )}
      </div>
      <style jsx global>{`
        .front img {
          filter: saturate(115%) brightness(105%);
        }
      `}</style>
      <style jsx>{`
        .player {
          position: relative;
          width: 101%;
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
