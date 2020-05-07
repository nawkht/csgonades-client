import { FC } from "react";
import { FaRunning, FaComment } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { GoEye, GoTerminal } from "react-icons/go";
import { tickrateString, Tickrate } from "../../models/Nade/NadeTickrate";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { kFormatter } from "../../utils/Common";
import { dateMinutesAgo } from "../../utils/DateUtils";
import { Popup } from "semantic-ui-react";
import { Movement } from "../../models/Nade/NadeMovement";
import { Technique } from "../../models/Nade/Technique";

type Props = {
  isFavorited?: boolean;
  technique?: Technique;
  movement?: Movement;
  tickrate?: Tickrate;
  createdAt: Date | string;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
};

const VIEW_COUNT_ENABLED = false;

export const NadeStats: FC<Props> = ({
  isFavorited,
  tickrate,
  technique,
  movement,
  createdAt,
  viewCount,
  favoriteCount,
  commentCount,
}) => {
  const { colors } = useTheme();
  const favoriteIconColor = isFavorited ? colors.FAV_YELLOW : colors.TEXT;
  const favIcon = isFavorited ? (
    <TiStarFullOutline
      color={favoriteIconColor}
      style={{ position: "relative", top: -1, fontSize: 19 }}
    />
  ) : (
    <TiStarFullOutline
      color={favoriteIconColor}
      style={{ position: "relative", top: -1, fontSize: 19 }}
    />
  );
  const hasMovement =
    movement === "running" ||
    movement === "crouchwalking" ||
    movement === "walking";
  const isJumpThrow = technique === "jumpthrow" && tickrate !== "any";
  const nadeIsNew = isNew(createdAt);

  return (
    <>
      <div className="item-bottom">
        <div className="stats">
          {!nadeIsNew && VIEW_COUNT_ENABLED && (
            <div className="stat">
              <div className="stat-content">
                <GoEye style={{ position: "relative", top: -1 }} />
                <span className="stat-text">{kFormatter(viewCount)}</span>
              </div>
            </div>
          )}

          {nadeIsNew && (
            <div className="stat">
              <span className="new-badge">NEW</span>
            </div>
          )}

          {favoriteCount > 0 && (
            <div className="stat">
              <div className="stat-content">
                {favIcon}
                <span className="stat-text">{favoriteCount}</span>
              </div>
            </div>
          )}

          {commentCount > 0 && (
            <div className="stat">
              <div className="stat-content">
                <FaComment
                  style={{ position: "relative", top: -1, color: colors.TEXT }}
                />
                <span className="stat-text">{commentCount}</span>
              </div>
            </div>
          )}
        </div>
        <div className="specials">
          {hasMovement && (
            <Popup
              inverted
              size="tiny"
              position="top center"
              content="Requires movement"
              trigger={
                <div className="special movement">
                  <FaRunning style={{ position: "relative", top: -1 }} />
                </div>
              }
            />
          )}

          {isJumpThrow && (
            <Popup
              content={tickrateTooltip(tickrate)}
              position="top center"
              inverted
              size="tiny"
              trigger={
                <div className="special tick">
                  <GoTerminal style={{ position: "relative", top: -1 }} />
                  <span className="special-text">
                    {tickrateString(tickrate || "any")}
                  </span>
                </div>
              }
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .center {
          text-align: center;
        }

        .item-bottom {
          display: flex;
          padding: 10px 15px;
          align-items: center;
          min-height: 42px;
        }

        .stats {
          display: flex;
          align-items: center;
          flex: 1;
          opacity: 0.75;
        }

        .stat-content {
          display: flex;
          align-items: center;
        }

        .stat {
          margin-right: 15px;
          font-size: 15px;
        }

        .stat-text,
        .special-text {
          font-size: 15px;
          margin-left: 5px;
          color: ${colors.TEXT};
        }

        .specials {
          display: flex;
          align-items: center;
          opacity: 0.75;
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
          font-size: 12px;
          border-radius: 5px;
          background: #709c14;
          color: white;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

function isNew(createdAt: Date | string) {
  const hoursAgoAdded = dateMinutesAgo(createdAt) / 60;

  return hoursAgoAdded < 36;
}

function tickrateTooltip(tickrate?: Tickrate) {
  switch (tickrate) {
    case "tick128":
      return (
        <>
          <div className="center">Only for 3rd party services</div>
          <div className="center">NOT matchmaking</div>
        </>
      );
    case "tick64":
      return (
        <>
          <div className="center">Only works on matchmaking</div>
        </>
      );
    default:
      return null;
  }
}
