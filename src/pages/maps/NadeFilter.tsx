import { FC } from "react";
import { TypeToggler } from "./TypeToggler";
import { useNadeFilter } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { colors, isMobile, uiDimensions } = useTheme();
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
      <div
        className={
          isMobile ? "nade-filter-container-mobile" : "nade-filter-container"
        }
      >
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
      </div>
      <style jsx>{`
        .nade-filter-container {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: ${uiDimensions.SIDEBAR_WIDTH}px;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 999;
        }

        .nade-filter-container .nade-filter {
          background: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-top: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
        }

        .nade-filter-container-mobile {
          position: fixed;
          top: ${uiDimensions.HEADER_HEIGHT}px;
          left: 0px;
          right: 0px;
          display: flex;
          justify-content: center;
          z-index: 999;
        }

        .nade-filter-container-mobile .nade-filter {
          background: white;
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-top: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          display: flex;
        }
      `}</style>
    </>
  );
};
