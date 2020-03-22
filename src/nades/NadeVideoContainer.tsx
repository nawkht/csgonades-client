import { FC } from "react";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { isMobile } from "react-device-detect";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nade: Nade;
};

export const NadeVideoContainer: FC<Props> = ({ nade }) => {
  return (
    <>
      <div className="video-grid">
        <ResponsiveVideo
          hdUrL={nade.gfycat.largeVideoUrl}
          sdUrl={nade.gfycat.smallVideoUrl}
          hdUrlWebm={nade.gfycat.largeVideoWebm}
          poster={nade.images.thumbnailUrl}
          controls={isMobile ? "mobile" : "desktop"}
        />
      </div>
      <style jsx>{`
        .video-grid {
        }
      `}</style>
    </>
  );
};
