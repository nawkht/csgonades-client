import { FC, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useAnalytics } from "../../utils/Analytics";

type Props = {};

export const HelpTip: FC<Props> = ({ children }) => {
  const [eventSent, setEventSent] = useState(false);
  const { event } = useAnalytics();
  const { colors } = useTheme();

  function onTipOpen() {
    if (!eventSent) {
      event({
        category: "MapPage",
        action: "Tickrate Hint Show",
      });
    }
    setEventSent(true);
  }

  return (
    <>
      <Popup
        content={<span>{children}</span>}
        position="top center"
        onOpen={onTipOpen}
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
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
