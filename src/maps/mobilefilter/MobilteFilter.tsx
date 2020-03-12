import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { NadeType } from "../../models/Nade/NadeType";
import { NadeTypeButton } from "../nadefilter/NadeTypeButton";
import { FilterBgMobile } from "./FilterBgMobile";

type Props = {
  byType: NadeType;
  onFilterByType: (type: NadeType) => void;
};

export const MobileFilter: FC<Props> = ({ byType, onFilterByType }) => {
  return (
    <>
      <div className="mobile-filter">
        <div className="types">
          <FilterBgMobile>
            <NadeTypeButton
              mobile={true}
              type="smoke"
              currentType={byType}
              onFilterByType={onFilterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="flash"
              currentType={byType}
              onFilterByType={onFilterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="molotov"
              currentType={byType}
              onFilterByType={onFilterByType}
            />
            <NadeTypeButton
              mobile={true}
              type="hegrenade"
              currentType={byType}
              onFilterByType={onFilterByType}
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
};
