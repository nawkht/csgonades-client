import { FC } from "react";
import { TypeToggler } from "./TypeToggler";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { NadeSorter } from "./NadeSorter";
import { MapPositionFilter } from "./MapPositionFilter";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";
import { NadeFilterResetButton } from "./NadeFilterResetButton";
import { isMobile } from "react-device-detect";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const { filterByType, nadeFilter, reset } = useNadeFilter();

  const { flash, hegrenade, molotov, smoke } = nadeFilter;

  function onReset() {
    GoogleAnalytics.event("Nade filter", `Reset`);
    reset();
  }

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

        <NadeFilterResetButton />
      </div>
      <style jsx>{`
        .nade-filter-container {
          display: flex;
          flex-direction: row;
          z-index: 999;
          padding-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          padding-right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          flex-wrap: wrap;
        }

        .nade-filter {
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          display: flex;
          overflow: hidden;
        }

        .nade-sorter,
        .nade-filter {
          margin-right: 6px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .nade-filter-container {
            padding-left: 12px;
            padding-right: 12px;
          }

          .nade-sorter {
            display: none;
          }

          .nade-filter-pos {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
