import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FavFilterButton } from "./FavFilterButton";
import { ResetFilterButton } from "./ResetFilterButton";
import { SidebarPanel } from "../../common/SidebarPanel";

type Props = {
  showSingInWarning: () => void;
};

export const NadeFilter: FC<Props> = memo(({ showSingInWarning }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="nade-filter">
        <SidebarPanel first title="FILTERS" titleComp={<ResetFilterButton />}>
          <div id="filter-grid">
            <div id="fav-label" className="filter-label">
              FAVORITES
            </div>
            <div id="fav-filter">
              <FavFilterButton showSingInWarning={showSingInWarning} />
            </div>

            <div id="type-label" className="filter-label">
              TYPE
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
          display: flex;
          justify-content: space-between;
        }

        .filter-help {
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
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
      `}</style>
    </>
  );
});
