import { useSortingMethod } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Dropdown } from "semantic-ui-react";

export const NadeSorter = () => {
  const { colors, uiDimensions } = useTheme();
  const { sortingMethod, setSortingMethod } = useSortingMethod();

  return (
    <>
      <div className="nade-sorter">
        <span>Sort by</span>
        <Dropdown
          inline
          options={[
            {
              key: "date",
              text: "Date",
              value: "date"
            },
            {
              key: "name",
              text: "Name",
              value: "name"
            }
          ]}
          direction="left"
          onChange={(_, data) => {
            const newMethod = data.value as any;
            setSortingMethod(newMethod);
          }}
          value={sortingMethod}
        />
      </div>
      <style jsx>{`
        .nade-sorter {
          display: flex;
          padding: 12px 18px;
          background: white;
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-top: none;
          border-bottom-left-radius: ${uiDimensions.BORDER_RADIUS};
          border-bottom-right-radius: ${uiDimensions.BORDER_RADIUS};
        }

        .nade-sorter span {
          margin-right: 6px;
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
