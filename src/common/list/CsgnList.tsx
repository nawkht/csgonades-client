import { Dimensions } from "../../constants/Constants";
import { EzoicPlaceHolder } from "../ezoicLoader/EzoicPlaceHolder";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
};

function ListBase<T>(props: Props<T>) {
  const { data, renderItem, keyExtractor } = props;

  function getKey(item: T) {
    return keyExtractor(item);
  }

  const numItems = data.length;

  return (
    <>
      <div className="list">
        {data.map((item, i) => (
          <div className="list-item" key={getKey(item)} style={{ order: i }}>
            {renderItem(item)}
          </div>
        ))}
        <div className="ad-1-container">
          <EzoicPlaceHolder key="In list 1" id={148} />
        </div>
        <div className="ad-2-container">
          <EzoicPlaceHolder key="In list 2" id={149} />
        </div>
        <div className="ad-3-container">
          <EzoicPlaceHolder key="In list 3" id={150} />
        </div>
        <div className="ad-4-container">
          <EzoicPlaceHolder key="In list 4" id={151} />
        </div>
        <div className="ad-5-container">
          <EzoicPlaceHolder key="In list 5" id={152} />
        </div>
        <div className="ad-6-container">
          <EzoicPlaceHolder key="In list 6" id={153} />
        </div>
      </div>
      <style jsx>{`
        .list {
          display: grid;
          grid-template-columns: repeat(3, minmax(100px, 1fr));
          grid-column-gap: calc(${Dimensions.GUTTER_SIZE} * 1.5);
          margin-top: -20px;
        }

        .ad-1-container,
        .ad-2-container,
        .ad-3-container,
        .ad-4-container,
        .ad-5-container,
        .ad-6-container {
          grid-column-end: 4;
          grid-column-start: 1;
        }

        .ad-1-container {
          grid-row-start: 4;
          grid-row-end: 5;
          display: ${numItems > 6 ? "block" : "none"};
        }

        .ad-2-container {
          grid-row-start: 9;
          grid-row-end: 10;
          display: ${numItems > 18 ? "block" : "none"};
        }

        .ad-3-container {
          grid-row-start: 14;
          grid-row-end: 15;
          display: ${numItems > 30 ? "block" : "none"};
        }

        .ad-4-container {
          grid-row-start: 19;
          grid-row-end: 20;
          display: ${numItems > 42 ? "block" : "none"};
        }

        .ad-5-container {
          grid-row-start: 24;
          grid-row-end: 25;
          display: ${numItems > 54 ? "block" : "none"};
        }

        .ad-6-container {
          grid-row-start: 29;
          grid-row-end: 30;
          display: ${numItems > 66 ? "block" : "none"};
        }

        @media only screen and (max-width: 1200px) {
          .list {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
          }

          .ad-1-container,
          .ad-2-container,
          .ad-3-container,
          .ad-4-container,
          .ad-5-container,
          .ad-6-container {
            grid-column-end: 3;
            grid-column-start: 1;
          }
        }

        @media only screen and (max-width: 700px) {
          .list {
            grid-template-columns: repeat(1, minmax(100px, 1fr));
          }

          .list-item {
            margin: 15px;
          }

          .ad-1-container,
          .ad-2-container,
          .ad-3-container,
          .ad-4-container,
          .ad-5-container,
          .ad-6-container {
            grid-column-end: 2;
            grid-column-start: 1;
          }
        }
      `}</style>
    </>
  );
}

export const CsgnList = ListBase;
