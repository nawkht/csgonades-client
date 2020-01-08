import { FC } from "react";
import { TypeToggler } from "./TypeToggler";
import { useNadeFilter } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeSorter } from "./NadeSorter";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { colors, uiDimensions } = useTheme();
  const { filterByType, nadeFilter } = useNadeFilter();

  const { flash, hegrenade, molotov, smoke } = nadeFilter;

  function onSmokeClick() {
    filterByType("smoke", map);
  }

  function onFlashClick() {
    filterByType("flash", map);
  }

  function onMolotovClick() {
    filterByType("molotov", map);
  }

  function onHeGrenadeClick() {
    filterByType("hegrenade", map);
  }

  return (
    <>
      <div className="nade-filter-container">
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
      <style jsx>{`
        .nade-filter-container {
          display: flex;
          flex-direction: row;
          z-index: 999;
          padding-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          padding-right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          justify-content: space-between;
        }

        .nade-filter {
          background: white;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          display: flex;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .nade-filter-container {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </>
  );
};
