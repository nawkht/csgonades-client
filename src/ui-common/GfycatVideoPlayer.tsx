import { FC, useState, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useKeepAspectRatio } from "../utils/CommonHooks";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { GfycatData } from "../models/Nade/GfycatData";
import useComponentSize from "@rehooks/component-size";

type Props = {
  videoUrl: string;
  width: number;
};

export const GfycatVideoPlayer: FC<Props> = ({ videoUrl, width }) => {
  return (
    <>
      <div className="gfycat-player">
        <video autoPlay controls muted>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <style jsx>{`
        .gfycat-player video {
          width: ${width}px;
        }
      `}</style>
    </>
  );
};
