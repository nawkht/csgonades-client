import { FC, SyntheticEvent, useMemo, useRef, useState } from "react";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";

type Props = {
  gfyId: string;
  sdUrl: string;
  hdUrL: string;
  hdUrlWebm?: string;
  poster?: string;
  controls?: "desktop" | "mobile";
};

export type Quality = "hd" | "sd";

export const ResponsiveVideo: FC<Props> = ({
  gfyId,
  sdUrl,
  hdUrL,
  hdUrlWebm,
  controls,
  poster,
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState<Quality>("hd");
  const [isPlaying, setIsPlaying] = useState(true);

  const videoUrl = useMemo(() => {
    if (quality === "hd") {
      return hdUrL;
    } else {
      return sdUrl;
    }
  }, [quality, hdUrL, sdUrl]);

  function togglePlay() {
    if (ref.current && ref.current.paused) {
      ref.current.play();
      setIsPlaying(true);
    } else if (ref.current && !ref.current.paused) {
      ref.current.pause();
      setIsPlaying(false);
    }
  }

  function qualityChange(q: Quality) {
    setQuality(q);
  }

  function fullscreen() {
    if (ref.current) {
      ref.current.requestFullscreen();
    }
  }

  function onVideoTimeUpdate({
    currentTarget,
  }: SyntheticEvent<HTMLVideoElement, Event>) {
    const { currentTime, duration } = currentTarget;
    const progressPercentage = Math.round((currentTime / duration) * 100);
    setProgress(progressPercentage);
  }

  function onProgressClick(percentage: number) {
    if (ref.current) {
      const totalTime = ref.current.duration;
      const newTime = (totalTime * percentage) / 100;
      ref.current.currentTime = newTime;
    }
  }

  return (
    <>
      <div className="video-container">
        <div className="video-content" onClick={togglePlay}>
          <video
            ref={ref}
            key={videoUrl}
            muted
            loop
            poster={poster}
            className="video-player"
            autoPlay={true}
            controls={controls === "mobile"}
            preload="auto"
            onTimeUpdate={onVideoTimeUpdate}
          >
            {hdUrlWebm && <source src={hdUrlWebm} type="video/webm" />}
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="gfycat">
          <a
            href={`https://gfycat.com/${gfyId}`}
            target="_black"
            rel="noopener"
          >
            <img src="/gfycat.png" />
          </a>
        </div>
        {controls === "desktop" && (
          <div className="video-controls">
            <VideoProgress
              progress={progress}
              onProgressClick={onProgressClick}
            />
            <VideoControls
              playing={isPlaying}
              quality={quality}
              onQualityChange={qualityChange}
              onPlayPauseClick={togglePlay}
              onFullscreen={fullscreen}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          display: block;
          background: black;
          padding-top: 56.25%;
          overflow: hidden;
        }

        .video-container:hover .video-controls {
          transform: translateY(0);
        }

        .gfycat {
          position: absolute;
          top: 0;
          right: 0;
        }

        .gfycat img {
          width: 80px;
          margin-top: 15px;
          margin-right: 15px;
          opacity: 0.7;
        }

        .video-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .video-content video {
          display: block;
          min-width: calc(100%);
          max-width: calc(100%);
          height: auto;
        }

        .video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 800;
          transform: translateY(calc(100% - 5px));
          transition: transform 0.15s;
        }
      `}</style>
    </>
  );
};
