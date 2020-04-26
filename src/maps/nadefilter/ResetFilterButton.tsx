import { FC, memo } from "react";
import { FaUndo } from "react-icons/fa";
import { useFilterReset } from "../../store/MapStore/hooks/useFilterReset";

type Props = {};

export const ResetFilterButton: FC<Props> = memo(({}) => {
  const { canReset, resetFilter } = useFilterReset();

  function onReset() {
    if (canReset) {
      resetFilter();
    }
  }

  const visible = canReset ? "visible" : "";

  return (
    <>
      <button className={`filter-btn ${visible}`} onClick={onReset}>
        <span className="label">RESET</span>
        <span className="icon">
          <FaUndo />
        </span>
      </button>
      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          background: rgba(173, 0, 0, 0.7);
          color: white;
          border-radius: 5px;
          opacity: 0;
          transition: all 0.1s;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          padding: 5px 8px;
        }

        .label {
          font-size: 12px;
          margin-right: 5px;
          font-weight: bold;
        }

        .icon {
          font-size: 11px;
          position: relative;
          top: 1px;
        }

        .visible {
          opacity: 1;
          cursor: pointer;
        }
      `}</style>
    </>
  );
});
