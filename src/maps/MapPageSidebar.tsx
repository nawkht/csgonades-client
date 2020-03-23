import { FC, memo } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";

export const MapPageSideBar: FC = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="ez-160 sticky">
          <EzoicPlaceHolder width={160} id={140} />
        </div>
        <div className="ez-300 sticky">
          <EzoicPlaceHolder width={300} id={144} />
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          flex: 1;
          padding-bottom: 100px;
        }

        .last {
          padding-bottom: 0;
        }

        .sticky {
          position: sticky;
          top: 50px;
        }

        .ez-160 {
          display: none;
        }

        @media only screen and (max-width: 1700px) {
          .ez-300 {
            display: none;
          }

          .ez-160 {
            display: block;
          }
        }

        .hidden {
          display: none;
        }
      `}</style>
    </>
  );
});
