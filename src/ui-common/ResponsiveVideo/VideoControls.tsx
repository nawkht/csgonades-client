import { FC } from "react";
import { FaCog, FaExpand, FaPause, FaPlay } from "react-icons/fa";
import { Quality } from "./ResponsiveVideo";

type Props = {
  quality: Quality;
  playing: boolean;
  onPlayPauseClick: () => void;
  onQualityChange: (quality: Quality) => void;
  onFullscreen: () => void;
};

export const VideoControls: FC<Props> = ({
  onPlayPauseClick,
  playing,
  quality,
  onQualityChange,
  onFullscreen
}) => {
  function qualityClick() {
    if (quality === "sd") {
      onQualityChange("hd");
    } else {
      onQualityChange("sd");
    }
  }

  return (
    <>
      <div className="video-controls-wrapper">
        <div className="video-controls">
          <button
            className="video-button video-play-pause"
            onClick={onPlayPauseClick}
          >
            {playing && <FaPause className="icon-pos" />}
            {!playing && <FaPlay className="icon-pos" />}
          </button>
          <div className="button-group">
            <button
              className="video-button video-quality"
              onClick={qualityClick}
            >
              <div className="quality-label">{quality.toUpperCase()}</div>
              <FaCog className="icon-pos" />
            </button>

            <button
              className="video-button video-fullscreen"
              onClick={onFullscreen}
            >
              <FaExpand className="icon-pos" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .video-controls {
          background: rgba(0, 0, 0, 0.4);
          padding: 0px 12px;
          display: flex;
          justify-content: space-between;
        }

        .video-progress {
        }

        .video-button {
          border: 0;
          outline: 0;
          color: white;
          cursor: pointer;
          position: relative;
          padding: 12px;
          background: transparent;
        }

        .video-play-pause {
          font-size: 1.2rem;
        }

        .video-quality {
          position: relative;
          font-size: 1.2rem;
        }

        .quality-label {
          position: absolute;
          font-size: 0.5rem;
          bottom: 50%;
          left: 50%;
          background: rgba(199, 22, 22, 0.9);
          color: white;
          z-index: 900;
          padding: 2px;
          border-radius: 4px;
        }

        .video-fullscreen {
          font-size: 1.2rem;
        }
      `}</style>
      <style jsx global>{`
        .icon-pos {
          position: relative;
          top: 2px;
        }
      `}</style>
    </>
  );
};
