import { FC } from "react";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { Icon } from "semantic-ui-react";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";

export const NadeFilterResetButton: FC = () => {
  const { reset, canReset } = useNadeFilter();

  function onReset() {
    GoogleAnalytics.event("Nade filter", `Reset`);
    reset();
  }

  const className = canReset ? "reset" : "reset disabled";

  return (
    <>
      <div className="reset-padder"></div>
      <div className={className} onClick={onReset}>
        <span>RESET</span>
        <Icon name="undo" />
      </div>
      <style jsx>{`
        .reset-padder {
          flex: 1;
        }

        .reset {
          padding: 12px;
          background: #e0e1e2;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          cursor: pointer;
        }

        .disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .reset span {
          margin-right: 6px;
        }
      `}</style>
    </>
  );
};
