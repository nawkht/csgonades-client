import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { FaChevronLeft, FaPause, FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dimensions } from "../../constants/Constants";
import { NadeLight, Status } from "../../models/Nade/Nade";
import { useRegisterView } from "../../store/NadeStore/hooks/useRegisterView";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeItemTitle } from "./NadeItemTitle";
import { NadeStats } from "./NadeStats";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItemMobile: FC<Props> = ({ nade, onItemClick }) => {
  const registerNadeView = useRegisterView();
  const [showMenu, setShowMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSentEvent, setHasSentEvent] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (isPlaying && !hasSentEvent) {
      timer = setTimeout(() => {
        registerNadeView(nade.id);
        setHasSentEvent(true);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, hasSentEvent, nade.id]);

  function onNadeItemClick() {
    onItemClick && onItemClick();
    setShowMenu(!showMenu);
  }

  function onPlayClick() {
    setIsPlaying(!isPlaying);
  }

  function onDetailsClick() {
    Router.push(`/nades/[nade]`, `/nades/${nade.id}`);
  }

  const nadeBoxClassName = nadeStatusToClassName(nade.status);

  return (
    <>
      <div
        className={nadeBoxClassName}
        style={{ display: "inline-block" }}
        onClick={onNadeItemClick}
      >
        {showMenu && (
          <div className="context-menu">
            <div className="context-btns">
              <div className="context-action" onClick={onPlayClick}>
                {isPlaying && (
                  <>
                    <FaPause /> <span>Pause</span>
                  </>
                )}
                {!isPlaying && (
                  <>
                    <FaPlay /> <span>Play</span>
                  </>
                )}
              </div>
              <div className="context-action" onClick={onDetailsClick}>
                <FaChevronLeft /> Details
              </div>
            </div>
          </div>
        )}

        <NadeItemTitle nade={nade} />
        <div className="media-canvas">
          <div className="media-content">
            <div className="media-image">
              <LazyLoadImage
                effect="blur"
                alt={`nade thumbnail`}
                src={nade.images.thumbnailUrl} // use normal <img> attributes as props
                width={"100%"}
              />
            </div>
            {isPlaying && (
              <div className="media-video">
                <video autoPlay muted playsInline loop controls={false}>
                  <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>

        <NadeStats nade={nade} />
      </div>
      <style jsx>{`
        .nadebox {
          background: ${colors.DP01};
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }

        .media-canvas {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: block;
          padding-top: 56.25%;
          background: black;
          overflow: hidden;
        }

        .context-menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 997;
        }

        .context-btns {
          padding: 12px;
          display: flex;
        }

        .context-action {
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.8);
          padding: 12px 18px;
          margin: 6px;
        }

        .media-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .media-image img {
          width: 100%;
        }

        .media-video {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .media-video video {
          width: 100%;
        }
      `}</style>
    </>
  );
};

function nadeStatusToClassName(status: Status) {
  switch (status) {
    case "pending":
      return "nadebox pending-nade";
    case "declined":
      return "nadebox declined-nade";
    default:
      return "nadebox";
  }
}
