import { FC } from "react";
import { FaUndo } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";

type Props = {
  map: CsgoMap;
};

export const ResetButton: FC<Props> = ({ map }) => {
  const { reset, canReset } = useNadeFilter(map);

  function onReset() {
    if (canReset) {
      GoogleAnalytics.event("Nade filter", `Reset`);
      reset();
    }
  }

  const className = canReset ? "reset" : "reset disabled";

  return (
    <>
      <Popup
        content="Reset filter"
        hoverable
        position="right center"
        inverted
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        size="tiny"
        trigger={
          <div className={className} onClick={onReset}>
            <FaUndo />
          </div>
        }
      />

      <style jsx>{`
        .reset {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: red;
          height: 45px;
          width: 45px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
          color: white;
          transition: all 0.2s;
          margin-top: 12px;
          padding-right: 2px;
        }

        .disabled {
          background: #292929;
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};
