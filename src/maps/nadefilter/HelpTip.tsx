import { FC } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

type Props = {};

export const HelpTip: FC<Props> = ({ children }) => {
  return (
    <>
      <button data-tip data-for="happyFace" className="filter-help">
        <FaQuestionCircle />
      </button>
      <ReactTooltip id="happyFace" backgroundColor="#111" effect="solid">
        <span>{children}</span>
      </ReactTooltip>

      <style jsx>{`
        .filter-help {
          background: transparent;
          font-size: 12px;
          padding: 0;
          margin: 0;
          padding-left: 3px;
          padding-right: 3px;
          outline: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
