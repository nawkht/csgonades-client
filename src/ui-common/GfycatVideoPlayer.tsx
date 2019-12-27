import { FC } from "react";
import ReactPlayer from "react-player";
import { GfycatData } from "../models/Nade";
import { useKeepAspectRatio } from "../utils/CommonHooks";

type Props = {
  gfyData?: GfycatData;
};

export const GfycatVideoPlayer: FC<Props> = ({ gfyData }) => {
  const { ref, height, width } = useKeepAspectRatio();

  return (
    <>
      <div className="gfycat-player" style={{ width: "100%" }} ref={ref}>
        <ReactPlayer
          controls
          playing
          loop
          playsinline
          volume={0}
          url={gfyData ? gfyData.smallVideoUrl : ""}
          width={width}
          height={height}
        />
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
          .gfycat-player video {
            outline: none;
          }
        `}
      </style>
    </>
  );
};
