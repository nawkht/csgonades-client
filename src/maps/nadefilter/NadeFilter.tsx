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
        <SidebarPanel first title="ACTIONS" titleComp={<ResetFilterButton />}>
          <div id="filter-actions">
            <div className="map">
              <button className="filter-btn" onClick={toggleMapViewVisibility}>
                <FaMap />
              </button>
            </div>
            <FavFilterButton showSingInWarning={showSingInWarning} />
          </div>
        </SidebarPanel>
        <SidebarPanel title="TYPE" titleComp={<ResetFilterButton />}>
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
        </SidebarPanel>

        <SidebarPanel title="TICKRATE" titleComp={<ResetFilterButton />}>
          <TickrateSelector />
        </SidebarPanel>
      </div>
      <style jsx>{`
        #filter-actions {
          display: flex;
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
