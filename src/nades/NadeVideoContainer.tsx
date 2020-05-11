import { FC, memo, useState } from "react";
import { GfycatIframe } from "./components/GfycatIframe";
import { CrossHair } from "./CrossHair";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useAnalytics } from "../utils/Analytics";

type Props = {
  lineUpUrl?: string;
  gfyId: string;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(({ gfyId, lineUpUrl }) => {
  const { event } = useAnalytics();
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<Tabs>("video");

  function onSetVideoTab() {
    setCurrentTab("video");
    event({
      category: "Nade Tab",
      action: "Video Tab Click",
    });
  }

  function onSetLineUpTab() {
    setCurrentTab("lineup");
    event({
      category: "Nade Tab",
      action: "Lineup Tab Click",
    });
  }

  const hasLineUp = !!lineUpUrl;

  return (
    <>
      <div className="video-wrap">
        {hasLineUp && (
          <div className="tab-selector">
            <button
              className={
                currentTab === "video" ? "tab-btn selected" : "tab-btn"
              }
              onClick={onSetVideoTab}
            >
              Video
            </button>
            <button
              className={
                currentTab === "lineup" ? "tab-btn selected" : "tab-btn"
              }
              onClick={onSetLineUpTab}
            >
              Line Up
            </button>
          </div>
        )}

        {currentTab === "video" && (
          <div className="video-tab">
            <GfycatIframe gfyId={gfyId} />
          </div>
        )}
        {hasLineUp && currentTab === "lineup" && (
          <div className={"lineup-tab"}>
            <div className="line-up-img">
              <div className="crosshair">
                <CrossHair />
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .tab-selector {
          width: 200px;
          position: absolute;
          top: 0px;
          left: calc(50% - 100px);
          z-index: 999;
          display: flex;
          justify-content: center;
        }

        .tab-btn {
          width: 100px;
          border: 1px solid rgba(0, 0, 0, 1);
          border-top: none;
          background: ${colors.filterBg};
          cursor: pointer;
          outline: none;
          padding: 8px;
          color: rgba(255, 255, 255, 0.9);
        }

        .tab-btn:first-child {
          border-bottom-left-radius: 10px;
          border-right: none;
        }

        .tab-btn:last-child {
          border-bottom-right-radius: 10px;
        }

        .tab-btn:hover,
        .selected {
          background: ${colors.filterBgHover};
        }

        .video-wrap {
          position: relative;
          overflow: hidden;
        }

        .lineup-tab {
          overflow: hidden;
          padding-bottom: calc(56.25% + 44px);
        }

        .line-up-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(${lineUpUrl});
          background-size: fill;
          background-position: center;
          transform: scale(1);
          transition: transform 0.2s;
        }

        .lineup-tab:hover .line-up-img {
          transform: scale(2.5);
        }

        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 30px;
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
          font-size: 40px;
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
          opacity: 0.85;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.54);
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
