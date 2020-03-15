import { FC, memo } from "react";
import { FaMap } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FavFilterButton } from "./FavFilterButton";
import { FilterBg } from "./FilterBg";
import { NadeTypeButton } from "./NadeTypeButton";
import { ResetFilterButton } from "./ResetFilterButton";
import { TickrateSelector } from "./TickrateSelector";
import { useFilterByType } from "../../store/MapStore/hooks/useFilterByType";
import { useToggleMapview } from "../../store/MapStore/hooks/useToggleMapView";

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
        <div className="map">
          <FilterBg>
            <button className="filter-btn" onClick={toggleMapViewVisibility}>
              <FaMap />
            </button>
          </FilterBg>
        </div>

        <div className="types">
          <FilterBg>
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
          </FilterBg>
        </div>

        <div className="favorite-container">
          <FilterBg>
            <FavFilterButton showSingInWarning={showSingInWarning} />
          </FilterBg>
        </div>

        <TickrateSelector />

        <ResetFilterButton />
      </div>
      <style jsx>{`
        .nade-filter {
        }

        .map,
        .types,
        .favorite-container {
          margin-bottom: 30px;
        }

        .filter-btn {
          border: none;
          outline: none;
          background: transparent;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.filterColor};
          font-size: 20px;
          cursor: pointer;
          border-bottom: 1px solid #e9e9e9;
        }

        .filter-btn:last-child {
          border-bottom: none;
        }
      `}</style>
    </>
  );
});
