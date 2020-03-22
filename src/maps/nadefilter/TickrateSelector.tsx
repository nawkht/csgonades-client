import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FilterBg } from "./FilterBg";
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
        <div className="filter-tick-label">TICK</div>
        <FilterBg>
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
        </FilterBg>
      </div>
      <style jsx>{`
        .filter-tick {
          margin-bottom: 30px;
        }

        .filter-tick .filter-tick-label {
          text-align: center;
          color: ${colors.filterBg};
          width: 100%;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .filter-btn {
          display: block;
          border: none;
          outline: none;
          appearance: none;
          background: transparent;
          width: 100%;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.filterColor};
          font-size: 20px;
          cursor: pointer;
          border-bottom: 1px solid ${colors.filterBorder};
        }

        .filter-btn:last-child {
          border: none;
        }

        .tickrate-btn {
          font-size: 16px;
          font-weight: 300;
        }

        .active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
