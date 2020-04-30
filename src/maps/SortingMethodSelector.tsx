import { FC, useMemo } from "react";
import { FaRocket, FaLongArrowAltUp, FaSith } from "react-icons/fa";
import { useFilterByMethod } from "../store/MapStore/hooks/useFilterByMethod";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const SortingMethodSelector: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { byMethod, filterBySortingMethod } = useFilterByMethod();

  const hotClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "hot") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  const newClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "new") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  const topClassName = useMemo(() => {
    const base = ["method-selector"];
    if (byMethod === "top") {
      base.push("selected");
    }
    return base.join(" ");
  }, [byMethod]);

  return (
    <>
      <div className="sorthing-method-selector">
        <button
          className={hotClassName}
          onClick={() => filterBySortingMethod("hot")}
        >
          <FaRocket />
          <span>HOT</span>
        </button>
        <button
          className={newClassName}
          onClick={() => filterBySortingMethod("new")}
        >
          <FaSith />
          <span>NEW</span>
        </button>
        <button
          className={topClassName}
          onClick={() => filterBySortingMethod("top")}
        >
          <FaLongArrowAltUp />
          <span>TOP</span>
        </button>
      </div>
      <style jsx>{`
        .sorthing-method-selector {
          margin-bottom: 30px;
          border-radius: 5px;
          overflow: hidden;
          display: inline-flex;
        }

        .method-selector {
          border: none;
          appearance: none;
          background: ${colors.DP01};
          padding: 10px 10px;
          display: flex;
          align-items: center;
          flex-direction: row;
          cursor: pointer;
          outline: none;
          border-right: 1px solid ${colors.DP00};
          transition: all 0.2s;
          color: ${colors.TEXT};
        }

        .method-selector span {
          margin-left: 5px;
        }

        .method-selector:hover {
          background: ${colors.DP03};
          color: #a84632;
        }

        .selected {
          background: ${colors.DP03};
          color: #a84632;
        }
      `}</style>
    </>
  );
};
