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
          <EzoicPlaceHolder id={148} />
        </div>
        <div className="ad-2-container">
          <EzoicPlaceHolder id={149} />
        </div>
        <div className="ad-3-container">
          <EzoicPlaceHolder id={150} />
        </div>
        <div className="ad-4-container">
          <EzoicPlaceHolder id={151} />
        </div>
        <div className="ad-5-container">
          <EzoicPlaceHolder id={152} />
        </div>
        <div className="ad-6-container">
          <EzoicPlaceHolder id={153} />
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
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .ad-1-container {
          grid-row: 4;
          display: ${numItems > 9 ? "block" : "none"};
        }

        .ad-2-container {
          grid-row: 9;
          display: ${numItems > 21 ? "block" : "none"};
        }

        .ad-3-container {
          grid-row: 14;
          display: ${numItems > 33 ? "block" : "none"};
        }

        .ad-4-container {
          grid-row: 19;
          display: ${numItems > 45 ? "block" : "none"};
        }

        .ad-5-container {
          grid-row: 24;
          display: ${numItems > 57 ? "block" : "none"};
        }

        .ad-6-container {
          grid-row: 29;
          display: ${numItems > 69 ? "block" : "none"};
        }

        @media only screen and (max-width: 1200px) {
          .list {
            grid-template-columns: repeat(2, minmax(100px, 1fr));
          }

          .ad-1-container {
            grid-row: 6;
            display: ${numItems > 6 * 2 ? "block" : "none"};
          }

          .ad-2-container {
            grid-row: 12;
            display: ${numItems > 12 * 2 ? "block" : "none"};
          }

          .ad-3-container {
            grid-row: 18;
            display: ${numItems > 18 * 2 ? "block" : "none"};
          }

          .ad-4-container {
            grid-row: 24;
            display: ${numItems > 24 * 2 ? "block" : "none"};
          }

          .ad-5-container {
            grid-row: 30;
            display: ${numItems > 30 * 2 ? "block" : "none"};
          }

          .ad-6-container {
            grid-row: 37;
            display: ${numItems > 36 * 2 ? "block" : "none"};
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
            grid-row: 14;
            display: ${numItems >= 14 ? "block" : "none"};
          }

          .ad-3-container {
            grid-row: 25;
            display: ${numItems >= 25 ? "block" : "none"};
          }

          .ad-4-container {
            grid-row: 36;
            display: ${numItems >= 36 ? "block" : "none"};
          }

          .ad-5-container {
            grid-row: 47;
            display: ${numItems >= 47 ? "block" : "none"};
          }

          .ad-6-container {
            grid-row: 58;
            display: ${numItems >= 58 ? "block" : "none"};
          }
        }
      `}</style>
    </>
  );
}

export const CsgnList = ListBase;
