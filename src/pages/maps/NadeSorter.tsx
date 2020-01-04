import { useSortingMethod } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Icon, Button } from "semantic-ui-react";

export const NadeSorter = () => {
  const { colors } = useTheme();
  const { sortingMethod, setSortingMethod } = useSortingMethod();

  return (
    <>
      <div className="nade-sorter">
        <button
          className={
            sortingMethod === "date" ? "sorting-btn selected" : "sorting-btn"
          }
          onClick={() => setSortingMethod("date")}
        >
          <Icon name="sort" />
          Sort by date
        </button>
        <button
          className={
            sortingMethod === "name" ? "sorting-btn selected" : "sorting-btn"
          }
          onClick={() => setSortingMethod("name")}
        >
          <Icon name="sort" />
          Sort by name
        </button>
      </div>
      <style jsx>{`
        .nade-sorter {
          display: flex;
        }

        .sorting-btn {
          border: 0;
          outline: none;
          cursor: pointer;
          display: flex;
          padding: 12px;
          border-right: 1px solid ${colors.PRIMARY_BORDER};
          background: white;
          opacity: 0.5;
        }

        .selected {
          opacity: 1;
        }

        .sorting-btn:first-child {
          border-bottom-left-radius: 3px;
        }

        .sorting-btn:last-child {
          border-bottom-right-radius: 3px;
          border-right: none;
        }
      `}</style>
    </>
  );
};
