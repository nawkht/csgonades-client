import { FC, memo, useState, useCallback } from "react";

import { GfycatIframe } from "./components/GfycatIframe";
import { useAnalytics } from "../utils/Analytics";
import { CrossHair } from "./CrossHair";

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
              <div className="crosshair">
                <CrossHair />
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
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
          width: 22px;
          height: 22px;
          opacity: 0.8;
          transform: scale(1);
          transition: all 0.2s;
        }

        .lineup {
          border-left: 3px solid rgba(255, 255, 255, 0.75);
          border-bottom: 3px solid rgba(255, 255, 255, 0.75);
          overflow: hidden;
          z-index: 799;
          display: flex;
          justify-content: space-around;
          align-items: center;
          cursor: pointer;
          position: absolute;
          top: -1px;
          right: -1px;
          background: url(${lineUpUrl});
          background-size: auto 150%;
          background-position: center;
          width: ${videoHeight}px;
          height: ${videoHeight}px;
          border-bottom-left-radius: 20px;
          transform-origin: top right;
          transform: scale(${zoomLineUp ? "1" : "0.3"});
          transition: all 0.2s;
          opacity: ${zoomLineUp ? 1 : 0.9};
        }

        .lineup:hover {
          opacity: 1;
          background-size: auto 300%;
        }

        .lineup:hover .crosshair {
          transform: scale(${zoomLineUp ? "2.0" : "1.0"});
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
