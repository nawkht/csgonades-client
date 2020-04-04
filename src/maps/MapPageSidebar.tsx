import { FC, memo } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { CsgoMap } from "../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="sticky">
          <EzoicPlaceHolder id={140} />
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          flex: 1;
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
