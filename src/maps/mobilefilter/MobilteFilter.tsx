import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useFilterByType } from "../../store2/FilterStore/hooks/useFilterByType";
import { NadeTypeButton } from "../nadefilter/NadeTypeButton";
import { FilterBgMobile } from "./FilterBgMobile";

export const MobileFilter: FC = memo(() => {
  const { byType, filterByType } = useFilterByType();

  return (
    <>
      <div className="mobile-filter">
        <div className="types">
          <FilterBgMobile>
            <NadeTypeButton
              mobile={true}
              type="smoke"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="flash"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="molotov"
              currentType={byType}
              onFilterByType={filterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="hegrenade"
              currentType={byType}
              onFilterByType={filterByType}
            />
          </FilterBgMobile>
        </div>
      </div>
      <style jsx>{`
        .mobile-filter {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: none;
          justify-content: space-around;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .mobile-filter {
            display: flex;
          }
        }
      `}</style>
    </>
  );
});
