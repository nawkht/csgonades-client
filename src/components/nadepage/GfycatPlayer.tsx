import { FC } from "react";
import { Aspect } from "./GfycatPlayerContainer";

type Props = {
  gfycatID?: string;
  aspect?: Aspect;
};

export const GfyCatPlayer: FC<Props> = ({ gfycatID, aspect }) => {
  function aspectToPadding(aspect?: Aspect) {
    switch (aspect) {
      case "16:10":
        return "65%";
      default:
        return "57.5%";
    }
  }

  return (
    <div className="gfycat-container">
      <iframe
        className="gfycat-frame"
        src={
          `https://gfycat.com/ifr/${gfycatID}` ||
          "https://gfycat.com/ifr/selfishblaringblackbuck"
        }
        allowFullScreen
        scrolling="no"
        allow="encrypted-media"
      ></iframe>
      <div className="hider" />
      <style jsx>{`
        .gfycat-container {
          position: relative;
          left: 0;
          width: 100%;
          height: 0;
          padding-bottom: ${aspectToPadding(aspect)};
          overflow: hidden;
          border-radius: 3px;
          padding-top: 37px;
        }

        .gfycat-frame {
          position: absolute;
          border: 0;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
        .hider {
          border: 1px solid white;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 44px;
        }
      `}</style>
    </div>
  );
};
