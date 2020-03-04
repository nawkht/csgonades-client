import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { FavFilter } from "./FavFilter";
import { NadeFilterResetButton } from "./NadeFilterResetButton";
import { NadeTypeFilters } from "./NadeTypeFilters";

type Props = {
  map: CsgoMap;
};

export const Filters: FC<Props> = memo(({ map }) => {
  const isSignedIn = useIsSignedIn();

  return (
    <>
      <div className="nade-filter-container">
        <div className="nade-filter-bg">
          <NadeTypeFilters map={map} />

          {isSignedIn && <FavFilter map={map} />}

          <NadeFilterResetButton map={map} />
        </div>
      </div>
      <style jsx>{`
        .nade-filter-container {
          display: none;
          margin-left: ${Dimensions.GUTTER_SIZE};
          margin-right: ${Dimensions.GUTTER_SIZE};
        }

        .nade-filter-bg {
          display: flex;
          flex: 1;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nade-filter-container {
            display: flex;
            margin-left: ${Dimensions.PADDING_MEDIUM};
            margin-right: ${Dimensions.PADDING_MEDIUM};
          }

          .nade-filter {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
});
