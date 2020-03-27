import { FC, memo } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";

export const MapPageSideBar: FC = memo(() => {
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
        }
      `}</style>
    </>
  );
});
