import { FC } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Popup } from "semantic-ui-react";

type Props = {};

export const HelpTip: FC<Props> = ({ children }) => {
  return (
    <>
      <Popup
        content={<span>{children}</span>}
        position="left center"
        inverted
        size="mini"
        trigger={
          <button data-tip data-for="happyFace" className="filter-help">
            <FaQuestionCircle />
          </button>
        }
      />

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
