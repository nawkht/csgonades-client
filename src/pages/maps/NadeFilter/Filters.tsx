import { FC } from "react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useIsSignedIn } from "../../../store/AuthStore/AuthHooks";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { FavFilter } from "./FavFilter";
import { NadeFilterResetButton } from "./NadeFilterResetButton";
import { NadeSorter } from "./NadeSorter";
import { NadeTypeFilters } from "./NadeTypeFilters";

type Props = {
  map: CsgoMap;
};

export const Filters: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const isSignedIn = useIsSignedIn();

  return (
    <>
      <div className="nade-filter-container">
        <div className="nade-filter-bg">
          <NadeTypeFilters map={map} />

          {isSignedIn && <FavFilter map={map} />}

          <div className="nade-sorter">
            <NadeSorter map={map} />
          </div>
        </div>

        <NadeFilterResetButton map={map} />
      </div>
      <style jsx>{`
        .nade-filter-container {
          display: flex;
          margin-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }

        .nade-filter-bg {
          display: flex;
          flex: 1;
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

          .nade-filter {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};
