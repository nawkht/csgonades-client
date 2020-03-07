import { FC } from "react";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FilterBg } from "./FilterBg";

type Props = {};

export const TickrateSelector: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { byTickrate, useTickrate128, useTickrate64 } = useNadeFilter();

  const tick64active = byTickrate === "tick64" ? "active" : "";
  const tick128active = byTickrate === "tick128" ? "active" : "";

  return (
    <>
      <div className="filter-tick">
        <div className="filter-tick-label">TICK</div>
        <FilterBg>
          <button
            className={`filter-btn tickrate-btn ${tick64active}`}
            onClick={useTickrate64}
          >
            64
          </button>
          <button
            className={`filter-btn tickrate-btn ${tick128active}`}
            onClick={useTickrate128}
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
          color: #dcdcdc;
          width: 100%;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .filter-btn {
          border: none;
          outline: none;
          background: transparent;
          width: 45px;
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
          background: #f8ffed;
        }
      `}</style>
    </>
  );
};
