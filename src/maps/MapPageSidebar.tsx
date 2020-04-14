import { FC, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="sticky"></div>
      </div>

      <style jsx>{`
        .sjakt {
          height: 100%;
        }

        .sticky {
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
});
