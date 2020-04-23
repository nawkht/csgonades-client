import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../constants/Constants";
import { AdUnit } from "../adunits/AdUnit";
import { isMobile } from "react-device-detect";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
};

function ListBase<T>(props: Props<T>) {
  const { data, renderItem, keyExtractor } = props;

  return (
    <List data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
  );
}

const List: FC<Props<any>> = memo(({ data, keyExtractor, renderItem }) => {
  const { colors } = useTheme();
  const numItems = data.length;
  const isEmpty = numItems === 0;

  const displayFirstAd = numItems > 7 && !isMobile;
  const displaySecondAd = numItems > 20 && !isMobile;

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
        {displayFirstAd && (
          <div className="ad-1-container">
            <AdUnit center tagType="top-medium-rectangle" />
          </div>
        )}
        {displaySecondAd && (
          <div className="ad-2-container">
            <AdUnit center tagType="bottom-medium-rectangle" />
          </div>
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
          grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .ad-1-container,
        .ad-2-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: ${colors.DP02};
          width: 300px;
          height: 250px;
          justify-self: center;
          border-radius: 5px;
          align-self: center;
          display: none;
        }

        .ad-1-container {
          order: 6;
        }

        .ad-2-container {
          order: 17;
        }
      `}</style>
    </>
  );
});

export const CsgnList = ListBase;
