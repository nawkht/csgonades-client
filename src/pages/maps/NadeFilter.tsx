import { FC } from "react";
import { TypeToggler } from "./TypeToggler";
import {
  useNadeFilter,
  useFilterByCoords
} from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { NadeSorter } from "./NadeSorter";
import { MapPositionFilter } from "./MapPositionFilter";
import { Button, Icon } from "semantic-ui-react";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

type Props = {
  map: CsgoMap;
};

export const NadeFilter: FC<Props> = ({ map }) => {
  const { colors, uiDimensions } = useTheme();
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
        <div className="nade-position-filter">
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

        <div className="reset" onClick={onReset}>
          <span>CLEAR</span>
          <Icon name="undo" />
        </div>
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
          background: white;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          display: flex;
          margin-right: 18px;
        }

        .nade-position-filter {
          background: white;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
        }

        .reset {
          padding: 12px;
          background: white;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          cursor: pointer;
        }

        .reset span {
          margin-right: 6px;
        }

        .nade-sorter,
        .nade-position-filter,
        .nade-filter {
          margin-right: ${uiDimensions.INNER_GUTTER_SIZE}px;
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
