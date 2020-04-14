import { FC, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { AdTag } from "../layout/AdContainer";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="sticky">
          <AdTag tagType="skyscraper" />
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
