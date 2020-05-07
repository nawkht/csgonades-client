import { FC, SyntheticEvent, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SeekBar } from "../SeekBar";
import { GfycatThumbnailControls } from "./GfycatThumbnailControls";
import { NadeItemFavBtn } from "./NadeItemFavBtn";
import { isSafari } from "react-device-detect";

type Props = {
  disableAction?: boolean;
  nadeId: string;
  nadeSlug?: string;
  thumbnailUrl?: string;
  smallVideoUrl?: string;
  avgColor?: string;
};

export const GfycatThumbnail: FC<Props> = ({
  thumbnailUrl,
  smallVideoUrl,
  nadeId,
  nadeSlug,
  disableAction,
  avgColor,
}) => {
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  function onVideoTimeUpdate({
    currentTarget,
  }: SyntheticEvent<HTMLVideoElement, Event>) {
    const { currentTime, duration } = currentTarget;
    const progressPercentage = Math.round((currentTime / duration) * 100);
    setProgress(progressPercentage);
  }

  const onLoad = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!isSafari) {
      e.currentTarget.playbackRate = 3;
    }
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
          {thumbnailUrl && (
            <LazyLoadImage
              effect="blur"
              alt={`nade thumbnail`}
              src={thumbnailUrl} // use normal <img> attributes as props
              width={"100%"}
            />
          )}
        </div>

        {hovering && !!smallVideoUrl && (
          <div className="back">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster={thumbnailUrl}
              onTimeUpdate={onVideoTimeUpdate}
              onLoadStart={onLoad}
            >
              <source src={smallVideoUrl} type="video/mp4" />
            </video>
            <SeekBar progress={progress} />
            <GfycatThumbnailControls />
            <NadeItemFavBtn
              nadeId={nadeId}
              slug={nadeSlug}
              disableAction={disableAction}
            />
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
          background: ${avgColor || "black"};
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
