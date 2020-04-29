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
import { ButtonGroup } from "./ButtonGroup";

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
          <div id="filter-grid">
            <div id="map-label" className="filter-label">
              MAP
            </div>

            <div id="tick-label" className="filter-label">
              TICKRATE
            </div>
            <div id="tick-filter">
              <TickrateSelector />
            </div>
            <div id="fav-label" className="filter-label">
              FAVORITES
            </div>
            <div id="fav-filter">
              <FavFilterButton showSingInWarning={showSingInWarning} />
            </div>
            <div id="map-filter">
              <button className="filter-btn" onClick={toggleMapViewVisibility}>
                <FaMap />
              </button>
            </div>
            <div id="type-label" className="filter-label">
              TYPE
            </div>
            <div id="type-filter">
              <ButtonGroup>
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
              </ButtonGroup>
            </div>
          </div>
        </SidebarPanel>
      </div>
      <style jsx>{`
        #filter-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr min-content min-content;
          grid-template-areas:
            "map-label . . . fav-label fav-label"
            "map-filter . . . fav fav"
            "type-label type-label type-label type-label tick-label tick-label"
            "type-filter type-filter type-filter type-filter tick tick";
        }

        #type-filter {
          grid-area: type-filter;
        }

        #map-label {
          grid-area: map-label;
        }

        #tick-label {
          grid-area: tick-label;
        }

        #fav-label {
          grid-area: fav-label;
        }

        #type-label {
          grid-area: type-label;
        }

        #map-filter {
          grid-area: map-filter;
          padding-bottom: 20px;
        }

        #fav-filter {
          grid-area: fav;
        }

        #tick-filter {
          grid-area: tick;
        }

        #smoke-filter {
          grid-area: smoke;
          padding-bottom: 20px;
        }

        #flash-filter {
          grid-area: flash;
        }

        #molotov-filter {
          grid-area: molotov;
        }

        #grenade-filter {
          grid-area: grenade;
        }

        .filter-label {
          font-size: 12px;
          font-weight: 300;
          margin-bottom: 5px;
          display: block;
          font-weight: 500;
          color: ${colors.TEXT};
        }

        .filter-btn {
          border: none;
          outline: none;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.TEXT};
          font-size: 18px;
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
