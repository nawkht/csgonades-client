import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";

type Props = {
  sdUrl: string;
  hdUrL: string;
  hdUrlWebm?: string;
  controls?: "desktop" | "mobile";
};

export type Quality = "hd" | "sd";

export const ResponsiveVideo: FC<Props> = ({
  sdUrl,
  hdUrL,
  hdUrlWebm,
  controls
}) => {
  const [quality, setQuality] = useState<Quality>("hd");
  const [isPlaying, setIsPlaying] = useState(true);

  const { videoRef, progress, videoNode } = useVideo(isPlaying);

  const videoUrl = useMemo(() => {
    if (quality === "hd") {
      return hdUrL;
    } else {
      return sdUrl;
    }
  }, [quality]);

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function qualityChange(q: Quality) {
    setQuality(q);
  }

  function fullscreen() {
    if (videoNode) {
      videoNode.requestFullscreen();
    }
  }

  return (
    <>
      <div className="video-container">
        <div className="video-content" onClick={togglePlay}>
          <video
            key={videoUrl}
            muted
            loop
            ref={videoRef}
            className="video-player"
            autoPlay={true}
            controls={controls === "mobile"}
            preload="auto"
          >
            {hdUrlWebm && <source src={hdUrlWebm} type="video/webm" />}
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        {controls === "desktop" && (
          <div className="video-controls">
            <VideoProgress progress={progress} />
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
          z-index: 901;
          transform: translateY(calc(100% - 5px));
          transition: transform 0.15s;
        }
      `}</style>
    </>
  );
};

export function useVideo(playing: boolean) {
  const [videoNode, setNode] = useState<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Event listeners
  useEffect(() => {
    if (!videoNode) {
      return;
    }

    const onTimeUpdate = () => {
      const perc = Math.round(
        (videoNode.currentTime / videoNode.duration) * 100
      );
      setProgress(perc);
    };

    videoNode.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      if (videoNode) {
        videoNode.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
  }, [videoNode]);

  // Play / pause
  useEffect(() => {
    if (!videoNode) {
      return;
    }

    if (playing) {
      videoNode.play();
    } else {
      videoNode.pause();
    }
  }, [playing]);

  // Ref
  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (!node) {
      return;
    }
    setNode(node);
  }, []);

  return { videoRef, progress, videoNode };
}
