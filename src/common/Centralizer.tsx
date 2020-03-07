import { FC } from "react";
import { Dimensions } from "../constants/Constants";

export const Centralizer: FC = ({ children }) => {
  return (
    <>
      <div className="centralizer">{children}</div>
      <style jsx>{`
        .centralizer {
          margin-right: ${Dimensions.SIDEBAR_WIDTH};
        }
      `}</style>
    </>
  );
};
