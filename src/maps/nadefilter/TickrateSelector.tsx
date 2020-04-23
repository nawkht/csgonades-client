import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useFilterByTickrate } from "../../store/MapStore/hooks/useFilterByTickrate";

type Props = {};

export const TickrateSelector: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { byTickrate, filterByTickrate } = useFilterByTickrate();

  function filterBy64tick() {
    filterByTickrate("tick64");
  }

  function filterByTickrate128() {
    filterByTickrate("tick128");
  }

  const tick64active = byTickrate === "tick64" ? "active" : "";
  const tick128active = byTickrate === "tick128" ? "active" : "";

  return (
    <>
      <div className="filter-tick">
        <button
          className={`filter-btn tickrate-btn ${tick64active}`}
          onClick={filterBy64tick}
        >
          64
        </button>

        <button
          className={`filter-btn tickrate-btn ${tick128active}`}
          onClick={filterByTickrate128}
        >
          128
        </button>
      </div>
      <style jsx>{`
        .filter-tick {
          display: flex;
        }

        .filter-btn {
          display: block;
          border: none;
          outline: none;
          appearance: none;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          font-size: 16px;
          font-weight: 300;
          background: ${colors.primaryBtnBg};
          color: ${colors.TEXT};
          border-radius: 5px;
          margin-right: 20px;
        }

        .filter-btn:hover {
          background: ${colors.primaryBtnHover};
        }

        .active {
          background: ${colors.primaryBtnHover};
        }
      `}</style>
    </>
  );
};
