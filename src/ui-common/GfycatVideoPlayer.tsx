import { FC, useState, useMemo } from "react";
import ReactPlayer from "react-player";
import { GfycatData } from "../models/Nade";
import { useKeepAspectRatio } from "../utils/CommonHooks";
import { Icon } from "semantic-ui-react";

type Props = {
  gfyData: GfycatData;
};

export const GfycatVideoPlayer: FC<Props> = ({ gfyData }) => {
  const [highDef, setHighDef] = useState(true);
  const { ref, height, width } = useKeepAspectRatio();

  const videoUrl = useMemo(() => {
    if (highDef) {
      return gfyData.largeVideoUrl;
    } else {
      return gfyData.smallVideoUrl;
    }
  }, [highDef]);

  function toggleQuality() {
    setHighDef(!highDef);
  }

  return (
    <>
      <div className="gfycat-player" style={{ width: "100%" }} ref={ref}>
        <ReactPlayer
          controls
          playing
          loop
          playsinline
          volume={0}
          url={videoUrl}
          width={width}
          height={height}
        />
        <div className="quality-toggle" onClick={toggleQuality}>
          <div className="quality">{highDef ? "HD" : "SD"}</div>
        </div>
      </div>
      <style jsx>{`
        .gfycat-player {
          position: relative;
        }

        .gfycat-player:hover .edit-button-wrapper {
          opacity: 1;
        }
      `}</style>
      <style jsx global>
        {`
          .gfycat-player {
            position: relative;
          }

          .gfycat-player:hover .quality-toggle {
            opacity: 1;
          }

          .quality-toggle {
            position: absolute;
            top: 12px;
            left: 12px;
            opacity: 0;
            transition: opacity 0.2s;
          }

          .quality {
            cursor: pointer;
            background rgba(50, 147, 168,0.7);
            padding: 3px 12px;
            border-radius: 6px;
            font-size: 0.8em;
            font-weight: bold;
            text-align: center;
            color: white;
          }

          .gfycat-player video {
            outline: none;
          }
        `}
      </style>
    </>
  );
};
