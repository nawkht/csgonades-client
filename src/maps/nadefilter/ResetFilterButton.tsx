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
        <FaUndo style={{ marginLeft: -1 }} />
      </button>
      <style jsx>{`
        .filter-btn {
          border: none;
          outline: none;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #767676;
          font-size: 16px;
          background: rgba(173, 0, 0, 0.7);
          color: white;
          border-radius: 5px;
          opacity: 0;
          transition: all 0.1s;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        }

        .visible {
          opacity: 1;
          cursor: pointer;
        }
      `}</style>
    </>
  );
});
