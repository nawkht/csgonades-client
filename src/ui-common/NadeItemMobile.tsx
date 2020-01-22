import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Icon } from "semantic-ui-react";
import { NadeApi } from "../api/NadeApi";
import { NadeLight, Status } from "../models/Nade/Nade";
import { tickrateString } from "../models/Nade/NadeTickrate";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { iconFromType, kFormatter } from "../utils/Common";
import { GoogleAnalytics } from "../utils/GoogleAnalytics";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItemMobile: FC<Props> = ({ nade, onItemClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSentEvent, setHasSentEvent] = useState(false);
  const { colors, durations, uiDimensions } = useTheme();
  let timer: NodeJS.Timer;

  useEffect(() => {
    if (isPlaying && !hasSentEvent) {
      timer = setTimeout(() => {
        NadeApi.registerView(nade.id);
        GoogleAnalytics.event("NadeItem", "Mobile play gfycat", nade.id);
        setHasSentEvent(true);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, hasSentEvent]);

  function onNadeItemClick() {
    onItemClick && onItemClick();
    setShowMenu(!showMenu);
  }

  function onPlayClick() {
    setIsPlaying(!isPlaying);
  }

  function onDetailsClick() {
    Router.push(`/nades?id=${nade.id}`, `/nades/${nade.id}`);
  }

  const title = nade.title || "No title...";
  const nadeBoxClassName = nadeStatusToClassName(nade.status);
  const iconUrl = iconFromType(nade.type);

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
                    <Icon name="pause" /> <span>Pause</span>
                  </>
                )}
                {!isPlaying && (
                  <>
                    <Icon name="play" /> <span>Play</span>
                  </>
                )}
              </div>
              <div className="context-action" onClick={onDetailsClick}>
                <Icon name="chevron right" /> Details
              </div>
            </div>
          </div>
        )}

        <div className="title">
          <img
            className="nade-type-icon"
            src={iconUrl}
            alt={`nade icon ${nade.type}`}
          />{" "}
          <span className="title-text">{title}</span>
        </div>
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
        <div className="stats">
          <div className="stat">
            <Icon name="eye" size="small" />
            <span className="icon-text">{kFormatter(nade.viewCount)}</span>
          </div>
          {nade.tickrate && nade.tickrate !== "any" && (
            <div className="stat tick">
              <Icon name="code" size="small" />
              <span className="icon-text">{tickrateString(nade.tickrate)}</span>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .nadebox {
          background: #fff;
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: ${uiDimensions.BORDER_RADIUS};
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
        }

        .nadebox:hover .title {
          background: ${colors.PRIMARY};
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

        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.PRIMARY_90_PERCENT};
          color: white;
          transition: background ${durations.transition}s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${uiDimensions.PADDING_SMALL}px;
        }

        .pending-nade .title {
          background: ${colors.WARNING_90};
        }

        .pending-nade:hover .title {
          background: ${colors.WARNING};
        }

        .declined-nade .title {
          background: ${colors.ERROR_90};
        }

        .declined-nade:hover .title {
          background: ${colors.ERROR};
        }

        .stats {
          display: flex;
          padding: 3px;
          justify-content: space-between;
          color: #444;
        }

        .stat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

        .stat .icon-text {
          font-size: 0.75em;
        }

        .tick {
          color: ${colors.PRIMARY};
        }

        .media-content {
          overflow: hidden;
          position: relative;
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
