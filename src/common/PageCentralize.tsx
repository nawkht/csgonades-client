import { FC } from "react";
import { Dimensions } from "../constants/Constants";

export const PageCentralize: FC = ({ children }) => {
  return (
    <>
      <div className="page-centralize">{children}</div>
      <style jsx>{`
        .page-centralize {
          max-width: 1280px;
          padding-left: 40px;
          padding-right: 40px;
          margin: 0 auto;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .page-centralize {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
};
