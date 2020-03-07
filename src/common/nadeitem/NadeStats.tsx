import { FC } from "react";
import { FaRunning } from "react-icons/fa";
import { GoEye, GoTerminal } from "react-icons/go";
import { TiStarFullOutline } from "react-icons/ti";
import { Popup } from "semantic-ui-react";
import { NadeLight } from "../../models/Nade/Nade";
import { tickrateString } from "../../models/Nade/NadeTickrate";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { kFormatter } from "../../utils/Common";

type Props = {
  nade: NadeLight;
};

export const NadeStats: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const favoriteIconColor = nade.isFavorited ? colors.FAV_YELLOW : undefined;
  const hasMovement = nade.movement === "running";
  const isJumpThrow = nade.technique === "jumpthrow";

  return (
    <>
      <div className="item-bottom">
        <div className="stats">
          {nade.viewCount > 500 && (
            <div className="stat">
              <div className="stat-content">
                <GoEye style={{ padding: 0, margin: 0 }} />
                <span className="stat-text">{kFormatter(nade.viewCount)}</span>
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
      <style jsx>{`
        .item-bottom {
          display: flex;
          padding: 4px 9px;
          align-items: center;
        }

        .stats {
          display: flex;
          align-items: center;
          color: #707070;
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
          font-size: 11px;
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
      `}</style>
    </>
  );
};
