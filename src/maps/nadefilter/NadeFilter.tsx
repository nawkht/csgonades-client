import { FC, memo } from "react";
import { FaMap } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FavFilterButton } from "./FavFilterButton";
import { NadeTypeButton } from "./NadeTypeButton";
import { ResetFilterButton } from "./ResetFilterButton";
import { TickrateSelector } from "./TickrateSelector";
import { useFilterByType } from "../../store/MapStore/hooks/useFilterByType";
import { useToggleMapview } from "../../store/MapStore/hooks/useToggleMapView";
import { SidebarPanel } from "../../common/SidebarPanel";

type Props = {
  showSingInWarning: () => void;
};

export const NadeFilter: FC<Props> = memo(({ showSingInWarning }) => {
  const { colors } = useTheme();
  const { byType, filterByType } = useFilterByType();
  const { toggleMapViewVisibility } = useToggleMapview();

  return (
    <>
      <div className="nade-filter">
        <SidebarPanel first title="FILTERS" titleComp={<ResetFilterButton />}>
          <div id="filter-actions">
            <div className="filter-section-wrap">
              <div className="filter-section">
                <span className="filter-label">MAP</span>
                <div className="map">
                  <button
                    className="filter-btn"
                    onClick={toggleMapViewVisibility}
                  >
                    <FaMap />
                  </button>
                </div>
              </div>
            </div>

            <div className="filter-section-wrap">
              <div className="filter-section">
                <span className="filter-label">TYPE</span>
                <div id="type-btns">
                  <NadeTypeButton
                    type="smoke"
                    currentType={byType}
                    onFilterByType={filterByType}
                  />
                  <NadeTypeButton
                    type="flash"
                    currentType={byType}
                    onFilterByType={filterByType}
                  />
                  <NadeTypeButton
                    type="molotov"
                    currentType={byType}
                    onFilterByType={filterByType}
                  />
                  <NadeTypeButton
                    type="hegrenade"
                    currentType={byType}
                    onFilterByType={filterByType}
                  />
                </div>
              </div>
            </div>

            <div className="filter-section-wrap">
              <div className="filter-section">
                <span className="filter-label">TICKRATE</span>
                <TickrateSelector />
              </div>
              <div className="filter-section">
                <span className="filter-label">FAVORITES</span>
                <FavFilterButton showSingInWarning={showSingInWarning} />
              </div>
            </div>
          </div>
        </SidebarPanel>
      </div>
      <style jsx>{`
        .filter-section-wrap {
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
        }

        .filter-section-wrap:last-child {
          margin-bottom: 0;
        }

        .filter-section {
          min-width: 50%;
        }

        .filter-label {
          font-size: 12px;
          font-weight: 300;
          margin-bottom: 5px;
          display: block;
          font-weight: 400;
        }

        .filter-btn {
          border: none;
          outline: none;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.TEXT};
          font-size: 20px;
          cursor: pointer;
          border-radius: 5px;
          background: ${colors.primaryBtnBg};
          margin-right: 20px;
        }

        .filter-btn:hover {
          background: ${colors.primaryBtnHover};
        }

        .filter-btn:hover {
          background: ${colors.primaryBtnHover};
        }
      `}</style>
    </>
  );
});
