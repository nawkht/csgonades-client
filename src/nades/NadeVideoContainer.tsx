import { FC, memo, useState, useCallback } from "react";

import { GfycatIframe } from "./components/GfycatIframe";
import { useAnalytics } from "../utils/Analytics";
import { CrossHair } from "./CrossHair";
import { FaTimes } from "react-icons/fa";

type Props = {
  lineUpUrl?: string;
  gfyId: string;
};

export const NadeVideoContainer: FC<Props> = memo(({ gfyId, lineUpUrl }) => {
  const [videoHeight, setVideoHeight] = useState(0);
  const { event } = useAnalytics();
  const [zoomLineUp, setZoomLineUp] = useState(false);

  const ref = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    setVideoHeight(node.clientHeight * 0.8);
  }, []);

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
      <div className="video-wrap" ref={ref}>
        <GfycatIframe gfyId={gfyId} />
        {lineUpUrl && (
          <>
            <div className="lineup" onClick={onToggle}>
              {!zoomLineUp && <div className="msg">SHOW LINEUP</div>}
              {zoomLineUp && (
                <div className="close">
                  <FaTimes />
                </div>
              )}
              <div className="crosshair">
                <CrossHair />
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 30px;
        }

        .video-wrap {
          position: relative;
          overflow: hidden;
        }

        .msg {
          display: block;
          outline: none;
          padding: 40px;
          position: absolute;
          bottom: 0px;
          right: 0px;
          left: 0px;
          z-index: 800;
          color: white;
          font-size: 50px;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          pointer-events: none;
          text-align: center;
        }

        .crosshair {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          opacity: 1;
          transform: scale(${zoomLineUp ? 1 : 5});
          opacity: 0.9;
          transition: all 0.2s;
        }

        .lineup {
          border: 5px solid rgba(0, 0, 0, 0.75);
          overflow: hidden;
          z-index: 799;
          display: flex;
          justify-content: space-around;
          align-items: center;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 10px;
          background: url(${lineUpUrl});
          background-size: ${zoomLineUp ? "auto 125%" : "auto 250%"};
          background-position: center;
          width: ${videoHeight}px;
          height: ${videoHeight}px;
          border-radius: 20px;
          transform-origin: top right;
          transform: scale(${zoomLineUp ? "1" : "0.3"});
          transition: all 0.2s;
          opacity: ${zoomLineUp ? 1 : 0.85};
        }

        .lineup:hover {
          opacity: 1;
          background-size: auto 250%;
        }

        .lineup:hover .crosshair {
          transform: scale(${zoomLineUp ? "2.0" : "5.0"});
          transition: all 0.2s;
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
