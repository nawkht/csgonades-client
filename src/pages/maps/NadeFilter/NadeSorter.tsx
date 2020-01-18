import { FC } from "react";
import { Dropdown } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
};

export const NadeSorter: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const { sortingMethod, setSortingMethod } = useNadeFilter(map);

  return (
    <>
      <div className="nade-sorter">
        <Dropdown
          inline
          options={[
            {
              key: "score",
              text: "By Hot",
              value: "score"
            },
            {
              key: "date",
              text: "By Date",
              value: "date"
            },
            {
              key: "name",
              text: "By Name",
              value: "name"
            }
          ]}
          direction="left"
          onChange={(_, data) => {
            const newMethod = data.value as any;
            console.log("> Setting sorting method", newMethod);
            setSortingMethod(newMethod);
          }}
          value={sortingMethod}
        />
      </div>
      <style jsx>{`
        .nade-sorter {
          display: flex;
          padding: 12px 18px;
          background: #e0e1e2;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
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
