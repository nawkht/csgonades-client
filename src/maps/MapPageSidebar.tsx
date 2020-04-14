import { FC, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { AdUnit } from "../common/adunits/AdUnit";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="sticky">
          <AdUnit type="skyscraper" />
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          height: 100%;
        }

        .sticky {
          position: sticky;
          top: 50px;
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
});
