import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { NadeTypeButton } from "../nadefilter/NadeTypeButton";
import { FilterBgMobile } from "./FilterBgMobile";

type Props = {};

export const MobileFilter: FC<Props> = ({}) => {
  return (
    <>
      <div className="mobile-filter">
        <div className="types">
          <FilterBgMobile>
            <NadeTypeButton mobile={true} type="smoke" />
            <NadeTypeButton mobile={true} type="flash" />
            <NadeTypeButton mobile={true} type="molotov" />
            <NadeTypeButton mobile={true} type="hegrenade" />
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
