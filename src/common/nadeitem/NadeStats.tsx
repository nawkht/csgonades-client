import { FC } from "react";
import { FaRunning, FaComment, FaCheckCircle } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { GoEye, GoTerminal } from "react-icons/go";
import { tickrateString, Tickrate } from "../../models/Nade/NadeTickrate";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { kFormatter } from "../../utils/Common";
import { dateMinutesAgo } from "../../utils/DateUtils";
import { Popup } from "semantic-ui-react";
import { Movement } from "../../models/Nade/NadeMovement";
import { Technique } from "../../models/Nade/Technique";
import { useAnalytics } from "../../utils/Analytics";

type Props = {
  isFavorited?: boolean;
  technique?: Technique;
  movement?: Movement;
  tickrate?: Tickrate;
  createdAt: Date | string;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  isPro?: boolean;
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
  isPro,
}) => {
  const { event } = useAnalytics();
  const { colors } = useTheme();
  const favoriteIconColor = isFavorited ? colors.FAV_YELLOW : colors.GREY;
  const favIcon = isFavorited ? (
    <TiStarFullOutline className="icon-fix" color={favoriteIconColor} />
  ) : (
    <TiStarFullOutline className="icon-fix" color={favoriteIconColor} />
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
                <GoEye className="icon-fix" />
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
                  className="icon-fix"
                  fontSize={12}
                  style={{ position: "relative", top: 0 }}
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
                  <FaRunning className="icon-fix" />
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
                  <GoTerminal className="icon-fix" />
                  <span className="special-text ticktext">
                    {tickrateString(tickrate || "any")}
                  </span>
                </div>
              }
            />
          )}

          {isPro && (
            <Popup
              inverted
              size="tiny"
              openOnTriggerClick={false}
              onOpen={() => {
                event({
                  category: "Hint",
                  action: "Pro Hint Opened",
                });
              }}
              position="top center"
              content={
                <div className="center">
                  <b>Verified Pro</b>
                  <br />
                  Nade has been thrown by a
                  <br />
                  professional CS:GO player.
                </div>
              }
              trigger={
                <div className="special pro">
                  <FaCheckCircle className="icon-fix" />
                  <span>PRO</span>
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
          padding: 8px 20px;
          align-items: center;
          min-height: 40px;
        }

        .stats {
          display: flex;
          align-items: center;
          flex: 1;
          opacity: 1;
        }

        .stat-content {
          display: flex;
          align-items: center;
          color: ${colors.GREY};
        }

        .stat {
          margin-right: 15px;
          font-size: 15px;
        }

        .stat-text,
        .special-text {
          font-size: 10px;
          font-weight: 500;
          margin-left: 3px;
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
          font-size: 14px;
        }

        .new-badge {
          padding: 3px 6px;
          font-size: 10px;
          border-radius: 5px;
          background: #709c14;
          color: white;
          font-weight: 500;
        }

        .pro {
          color: #00b8d9;
        }

        .pro span {
          font-size: 10px;
          font-weight: 500;
          margin-left: 2px;
        }

        .ticktext {
          font-size: 10px;
          color: ${colors.NADE_ITEM_HIGHLIGHT};
        }
      `}</style>
      <style jsx global>{`
        .icon-fix {
          position: relative;
          top: -1px;
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
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">Only for 3rd party services</div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
    case "tick64":
      return (
        <>
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">Only works on matchmaking</div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
    default:
      return (
        <>
          <div className="center">
            <b>Jumpthrow Bind</b>
          </div>
          <div className="center">
            Works on matchmaking and 3rd party services
          </div>
          <style jsx>{`
            .center {
              text-align: center;
            }
          `}</style>
        </>
      );
  }
}
