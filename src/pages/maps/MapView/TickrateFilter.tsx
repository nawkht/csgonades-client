import { FC, useMemo } from "react";
import { useNadeFilter } from "../../../store/NadeFilterStore/NadeFilterHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {};

export const TickrateFilter: FC<Props> = ({}) => {
  const { byTickrate, switchTickrate } = useNadeFilter();
  const { colors } = useTheme();

  const tickrateString = useMemo(() => {
    if (byTickrate === "tick128") {
      return "128";
    } else if (byTickrate === "tick64") {
      return "64";
    } else {
      return "Any";
    }
  }, [byTickrate]);

  return (
    <>
      <button className="tickrate-btn" onClick={switchTickrate}>
        <span className="label">Tickrate</span>
        <span className="tick">{tickrateString}</span>
      </button>
      <style jsx>{`
        .tickrate-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          border: none;
          background: ${colors.filterBg};
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          transition: background 0.2s;
          cursor: pointer;
          margin-top: 12px;
          padding: 6px;
          width: 45px;
          height: 45px;
          color: white;
          outline: none;
        }

        .label {
          font-size: 0.6rem;
          display: block;
        }

        .tick {
          display: block;
          font-weight: 400;
        }
      `}</style>
    </>
  );
};
