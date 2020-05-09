import { FC, memo, useState } from "react";

import { GfycatIframe } from "./components/GfycatIframe";
import { useAnalytics } from "../utils/Analytics";

type Props = {
  lineUpUrl?: string;
  gfyId: string;
};

export const NadeVideoContainer: FC<Props> = memo(({ gfyId, lineUpUrl }) => {
  const { event } = useAnalytics();
  const [zoomLineUp, setZoomLineUp] = useState(false);

  function onToggle() {
    if (!zoomLineUp) {
      event({
        category: "Line Up Image",
        action: "Open",
      });
    } else {
      event({
        category: "Line Up Image",
        action: "Close",
      });
    }
    setZoomLineUp(!zoomLineUp);
  }

  return (
    <>
      <div className="video-wrap">
        <GfycatIframe gfyId={gfyId} />
        {lineUpUrl && (
          <div
            className="lineup"
            onClick={onToggle}
          ></div>
        )}
      </div>
      <style jsx>{`
        .video-wrap {
          position: relative;
        }

        .lineup {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          background: url(${lineUpUrl});
          background-size: contain;
          width: 400px;
          height: 400px;
          border-bottom-left-radius: 20px;
          transform-origin: top right;
          transform: scale(${zoomLineUp ? "1" : "0.3"});
          transition: all 0.2s;
          opacity: ${zoomLineUp ? 1 : 0.9};
        }

        .lineup:hover {
          opacity: 1;
        }

        button {
          background: rgba(0, 0, 0, 0.9);
          border-radius: 5px;
          color: white;
          font-size: 14px;
          border: none;
          outline: none;
        }

        @keyframes example {
          from {
            background-color: red;
          }
          to {
            background-color: yellow;
          }
        }
      `}</style>
    </>
  );
});
