import { FC } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";

type Props = {
  map: CsgoMap;
};

export const NadeFilterResetButton: FC<Props> = () => {
  const { isDefault, resetFilter } = useNadeFilter();

  function onReset() {
    if (!isDefault) {
      resetFilter();
    }
  }

  const className = !isDefault ? "reset" : "reset disabled";

  return (
    <>
      <Popup
        content="Reset filter"
        hoverable
        position="bottom center"
        inverted
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        size="tiny"
        trigger={
          <div className={className} onClick={onReset}>
            <Icon name="undo" />
          </div>
        }
      />

      <style jsx>{`
        .reset {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-left: 12px;
          padding-right: 10px;
          padding-bottom: 3px;
          background: #db2828;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          cursor: pointer;
          color: white;
          transition: all 0.2s;
          margin-left: 12px;
        }

        .disabled {
          color: black;
          background: #e0e1e2;
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
