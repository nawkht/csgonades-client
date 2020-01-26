import Link from "next/link";
import { FC } from "react";
import { FaRunning } from "react-icons/fa";
import { GoEye, GoTerminal } from "react-icons/go";
import { TiStarFullOutline } from "react-icons/ti";
import { Popup } from "semantic-ui-react";
import { AnimationTimings, Dimensions } from "../constants/Constants";
import { NadeLight, Status } from "../models/Nade/Nade";
import { tickrateString } from "../models/Nade/NadeTickrate";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { iconFromType, kFormatter } from "../utils/Common";
import { GfycatThumbnail } from "./GfycatThumbnail";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItem: FC<Props> = ({ nade, onItemClick }) => {
  const { colors } = useTheme();
  const title = nade.title || "No title...";

  const nadeBoxClassName = nadeStatusToClassName(nade.status);
  const iconUrl = iconFromType(nade.type);
  const favoriteIconColor = nade.isFavorited ? "#fac800" : undefined;

  const hasMovement = nade.movement === "running";
  const isJumpThrow = nade.technique === "jumpthrow";

  return (
    <>
      <Link href={`/nades?id=${nade.id}`} as={`/nades/${nade.id}`}>
        <a
          className={nadeBoxClassName}
          style={{ display: "inline-block" }}
          onClick={onItemClick}
        >
          <div className="title">
            <img
              className="nade-type-icon"
              src={iconUrl}
              alt={`nade icon ${nade.type}`}
            />
            <span className="title-text">{title}</span>
          </div>
          <div className="video">
            <GfycatThumbnail nade={nade} />
          </div>
          <div className="item-bottom">
            <div className="stats">
              {nade.viewCount > 500 && (
                <div className="stat">
                  <div className="stat-content">
                    <GoEye style={{ padding: 0, margin: 0 }} />
                    <span className="stat-text">
                      {kFormatter(nade.viewCount)}
                    </span>
                  </div>
                </div>
              )}

              {nade.viewCount <= 500 && (
                <div className="stat">
                  <span className="new-badge">NEW</span>
                </div>
              )}

              {nade.favoriteCount > 0 && (
                <div className="stat">
                  <div className="stat-content">
                    <TiStarFullOutline color={favoriteIconColor} />
                    <span className="stat-text">{nade.favoriteCount}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="specials">
              {hasMovement && (
                <Popup
                  content="Requires movement"
                  hoverable
                  inverted
                  size="tiny"
                  position="bottom center"
                  mouseEnterDelay={300}
                  openOnTriggerClick={false}
                  trigger={
                    <div className="special movement">
                      <FaRunning />
                    </div>
                  }
                />
              )}

              {isJumpThrow && (
                <Popup
                  content="Uses jumpthrow bind"
                  hoverable
                  inverted
                  size="tiny"
                  position="bottom center"
                  mouseEnterDelay={300}
                  openOnTriggerClick={false}
                  trigger={
                    <div className="special tick">
                      <GoTerminal />
                      <span className="special-text">
                        {tickrateString(nade.tickrate || "any")}
                      </span>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: ${colors.UI_BG};
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          cursor: pointer;
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${AnimationTimings.fast}s;
          overflow: hidden;
          width: 100%;
          max-width: 300px;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
        }

        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.nadeItemHeadingBg};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${Dimensions.PADDING_SMALL};
        }

        .pending-nade .title {
          background: ${colors.WARNING};
        }

        .declined-nade .title {
          background: ${colors.ERROR};
        }

        .item-bottom {
          display: flex;
          padding: 4px 9px;
          align-items: center;
        }

        .stats {
          display: flex;
          align-items: center;
          color: ${colors.TEXT};
          flex: 1;
        }

        .stat {
          margin-right: 12px;
        }

        .stat-content {
          display: flex;
          align-items: center;
        }

        .stat-text,
        .special-text {
          font-size: 0.7em;
          margin-left: 3px;
          padding-top: 1px;
        }

        .specials {
          display: flex;
          align-items: center;
        }

        .special:last-child {
          margin-right: 0;
        }

        .special {
          color: ${colors.NADE_ITEM_HIGHLIGHT};
          display: flex;
          align-items: center;
          margin-right: 12px;
        }

        .new-badge {
          padding: 3px 6px;
          font-size: 0.7em;
          border-radius: 4px;
          background: #709c14;
          color: white;
          font-weight: normal;
        }

        .video {
          overflow: hidden;
        }

        .spacer {
          flex: 1;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nadebox {
            max-width: 100%;
          }
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
