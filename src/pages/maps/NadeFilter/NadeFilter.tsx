import { FC } from "react";
import { TypeToggler } from "./TypeToggler";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { NadeSorter } from "./NadeSorter";
import { MapPositionFilter } from "./MapPositionFilter";
import { NadeFilterResetButton } from "./NadeFilterResetButton";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const { filterByType, nadeFilter } = useNadeFilter();

  const { flash, hegrenade, molotov, smoke } = nadeFilter;

  function onSmokeClick() {
    filterByType("smoke");
  }

  function onFlashClick() {
    filterByType("flash");
  }

  function onMolotovClick() {
    filterByType("molotov");
  }

  function onHeGrenadeClick() {
    filterByType("hegrenade");
  }

  return (
    <>
      <div className="nade-filter-container">
        <div className="nade-filter-bg">
          <div className="main-filters">
            <div className="nade-filter-pos">
              <MapPositionFilter map={map} />
            </div>

            <div className="nade-filter">
              <TypeToggler active={smoke} type="smoke" onClick={onSmokeClick} />
              <TypeToggler active={flash} type="flash" onClick={onFlashClick} />
              <TypeToggler
                active={molotov}
                type="molotov"
                onClick={onMolotovClick}
              />
              <TypeToggler
                active={hegrenade}
                type="hegrenade"
                onClick={onHeGrenadeClick}
              />
            </div>

            <div className="nade-sorter">
              <NadeSorter />
            </div>
          </div>

          <NadeFilterResetButton />
        </div>
      </div>
      <style jsx>{`
        .nade-filter-container {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: ${uiDimensions.SIDEBAR_WIDTH}px;
          right: 0;
          z-index: 998;
        }

        .nade-filter-bg {
          display: flex;
          flex-direction: row;
          margin-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }

        .main-filters {
          display: flex;
          background: rgba(242, 242, 242, 0.9);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .nade-filter {
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          display: flex;
          overflow: hidden;
        }

        .nade-filter {
          margin-right: 6px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .nade-filter-container {
            padding-left: 12px;
            padding-right: 12px;
            left: 0;
          }

          .nade-sorter {
            display: none;
          }

          .nade-filter-pos {
            display: none;
          }

          .nade-filter {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};
