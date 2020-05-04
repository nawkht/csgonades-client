import { FC } from "react";
import { FaRunning, FaComment } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { GoEye, GoTerminal } from "react-icons/go";
import { NadeLight, Nade } from "../../models/Nade/Nade";
import { tickrateString } from "../../models/Nade/NadeTickrate";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { kFormatter } from "../../utils/Common";
import { dateMinutesAgo } from "../../utils/DateUtils";

type Props = {
  nade: NadeLight | Nade;
};

const VIEW_COUNT_ENABLED = false;

export const NadeStats: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const favoriteIconColor = nade.isFavorited ? colors.FAV_YELLOW : colors.TEXT;
  const favIcon = nade.isFavorited ? (
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
  const hasMovement = nade.movement === "running";
  const isJumpThrow = nade.technique === "jumpthrow";
  const nadeIsNew = isNew(nade.createdAt);

  return (
    <>
      <div className="item-bottom">
        <div className="stats">
          {!nadeIsNew && VIEW_COUNT_ENABLED && (
            <div className="stat">
              <div className="stat-content">
                <GoEye style={{ position: "relative", top: -1 }} />
                <span className="stat-text">{kFormatter(nade.viewCount)}</span>
              </div>
            </div>
          )}

          {nadeIsNew && (
            <div className="stat">
              <span className="new-badge">NEW</span>
            </div>
          )}

          {nade.favoriteCount > 0 && (
            <div className="stat">
              <div className="stat-content">
                {favIcon}
                <span className="stat-text">{nade.favoriteCount}</span>
              </div>
            </div>
          )}

          {nade.commentCount > 0 && (
            <div className="stat">
              <div className="stat-content">
                <FaComment
                  style={{ position: "relative", top: -1, color: colors.TEXT }}
                />
                <span className="stat-text">{nade.commentCount}</span>
              </div>
            </div>
          )}
        </div>
        <div className="specials">
          {hasMovement && (
            <div className="special movement">
              <FaRunning style={{ position: "relative", top: -1 }} />
            </div>
          )}

          {isJumpThrow && (
            <div className="special tick">
              <GoTerminal style={{ position: "relative", top: -1 }} />
              <span className="special-text">
                {tickrateString(nade.tickrate || "any")}
              </span>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .item-bottom {
          display: flex;
          padding: 10px 15px;
          align-items: center;
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
