import { Dimensions } from "../../constants/Constants";
import { FC, memo } from "react";

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
  const numItems = data.length;

  return (
    <>
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
        <div className="ad-1-container"></div>
        <div className="ad-2-container"></div>
        <div className="ad-3-container"></div>
        <div className="ad-4-container"></div>
      </div>
      <style jsx>{`
        .list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .ad-1-container,
        .ad-2-container,
        .ad-3-container,
        .ad-4-container {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-around;
          display: none;
        }

        @media only screen and (max-width: 1200px) {
          .list {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
          }
        }

        @media only screen and (max-width: 700px) {
          .list {
            grid-template-columns: repeat(1, minmax(100px, 1fr));
          }

          .list-item {
            margin: 15px;
          }

          .ad-1-container {
            grid-row: 7;
            display: ${numItems >= 7 ? "block" : "none"};
          }

          .ad-2-container {
            grid-row: 25;
            display: ${numItems >= 25 ? "block" : "none"};
          }

          .ad-3-container {
            grid-row: 47;
            display: ${numItems >= 47 ? "block" : "none"};
          }

          .ad-4-container {
            grid-row: 58;
            display: ${numItems >= 58 ? "block" : "none"};
          }
        }
      `}</style>
    </>
  );
});

export const CsgnList = ListBase;
