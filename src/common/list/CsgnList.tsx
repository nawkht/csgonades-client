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

  const displayFirstAd = numItems > 15 && !isMobile;
  const displaySecondAd = numItems > 30 && !isMobile;

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
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .ad-1-container,
        .ad-2-container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: ${colors.DP02};
          width: 310px;
          height: 260px;
          justify-self: center;
          padding: 5px;
          box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }

        .ad-1-container {
          order: 12;
        }

        .ad-2-container {
          order: 23;
        }
      `}</style>
    </>
  );
});

export const CsgnList = ListBase;
