import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  topRightComp?: JSX.Element;
  secondRowRightComp?: JSX.Element;
};

function ListBase<T>(props: Props<T>) {
  const { data, renderItem, keyExtractor } = props;

  return (
    <List
      {...props}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

const List: FC<Props<any>> = memo(
  ({ data, keyExtractor, renderItem, topRightComp, secondRowRightComp }) => {
    const { colors } = useTheme();
    const numItems = data.length;
    const isEmpty = numItems === 0;

    const displayFirstAd = numItems > 10;

    return (
      <>
        {isEmpty && (
          <div className="empty-list">
            No nades here yet, sign in to add some!
          </div>
        )}
        <div className="list">
          {data.map((item, i) => (
            <div
              className="list-item"
              key={keyExtractor(item)}
              style={{ order: i }}
            >
              {renderItem(item)}
            </div>
          ))}
          {!!topRightComp && (
            <div className="top-right-comp">{topRightComp}</div>
          )}

          {!!secondRowRightComp && displayFirstAd && (
            <div className="second-row-comp">{secondRowRightComp}</div>
          )}
        </div>
        <style jsx>{`
          .empty-list {
            border: 1px solid ${colors.BORDER};
            padding: 30px;
            font-size: 18px;
            border-radius: 5px;
            background: ${colors.DP02};
            color: ${colors.TEXT};
          }

          .list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          .top-right-comp {
            grid-column-start: 3;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 3;
            background: ${colors.DP02};
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid ${colors.BORDER};
          }

          .second-row-comp {
            order: 10;
          }

          @media only screen and (max-width: 975px) {
            .top-right-comp {
              grid-column-start: 2;
              grid-column-end: 3;
              grid-row-start: 1;
              grid-row-end: 3;
            }

            .second-row-comp {
              order: 1;
            }
          }

          @media only screen and (max-width: 600px) {
            .top-right-comp {
              display: none;
            }

            .second-row-comp {
              order: 2;
            }
          }
        `}</style>
      </>
    );
  }
);

export const CsgnList = ListBase;
