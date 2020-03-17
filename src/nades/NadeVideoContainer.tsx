import { FC } from "react";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { isMobile } from "react-device-detect";
import { Nade } from "../models/Nade/Nade";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Dimensions } from "../constants/Constants";

type Props = {
  nade: Nade;
};

export const NadeVideoContainer: FC<Props> = ({ nade }) => {
  return (
    <>
      <div className="video-grid">
        <div className="video">
          <ResponsiveVideo
            hdUrL={nade.gfycat.largeVideoUrl}
            sdUrl={nade.gfycat.smallVideoUrl}
            hdUrlWebm={nade.gfycat.largeVideoWebm}
            poster={nade.images.thumbnailUrl}
            controls={isMobile ? "mobile" : "desktop"}
          />
        </div>
        <div className="ad-left-video">
          <EzoicPlaceHolder key="Nade Page | Left video 2" id={132} />
        </div>

        <div className="ad-right-video">
          <EzoicPlaceHolder key="Nade Page | Right video 2" id={133} />
        </div>
      </div>
      <style jsx>{`
        .video-grid {
          display: grid;
          grid-template-columns: 160px 1fr 160px;
          grid-template-rows: auto;
          grid-template-areas: "ad video ad2";
          grid-column-gap: ${Dimensions.GUTTER_SIZE};
          max-width: 1580px;
          margin: 0 auto;
          padding-top: 30px;
        }

        .ad-left-video {
          grid-area: ad;
        }

        .ad-right-video {
          grid-area: ad2;
        }

        .video {
          grid-area: video;
        }

        @media only screen and (max-width: 1400px) {
          .video-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: "video";
            max-width: 85vw;
          }

          .ad-right-video,
          .ad-left-video {
            display: none;
          }
        }

        @media only screen and (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: "video";
            max-width: 90vw;
          }
        }
      `}</style>
    </>
  );
};
