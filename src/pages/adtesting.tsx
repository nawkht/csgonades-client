import { FC, useState } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";

type Props = {};

const AdTesting: FC<Props> = ({}) => {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="ad-testing">
        <div className="navigation">
          <h3>Navigate between the two virtual pages</h3>
          <button onClick={() => setPage(1)}>Navigate Page 1</button>
          <button onClick={() => setPage(2)}>Navigate Page 2</button>
        </div>

        <div className="page">
          <div className="buttons">
            <h3>Standalone commands</h3>

            <button onClick={() => ezstandalone.enable()}>enable()</button>
            <button onClick={() => ezstandalone.display()}>display()</button>
            <button onClick={() => ezstandalone.refresh()}>refresh()</button>
            <button onClick={() => ezstandalone.destroy()}>destroy()</button>

            <span>Define ads, PAGE1</span>
            <button onClick={() => ezstandalone.define(157, 158)}>
              define(157, 158)
            </button>

            <span>Define ads, PAGE2</span>
            <button onClick={() => ezstandalone.define(158, 159, 160)}>
              define(158, 159, 160)
            </button>

            <span>Load group, PAGE1</span>
            <button
              onClick={() =>
                ezstandalone.loadGroup([157, 158], true, true, true)
              }
            >
              loadGrop([157, 158])
            </button>

            <span>Load loadGrop, PAGE2</span>
            <button
              onClick={() =>
                ezstandalone.loadGroup([158, 159, 160], true, true, true)
              }
            >
              loadGrop([158, 159, 160])
            </button>
          </div>

          {page === 1 && (
            <div className="ads">
              <h4>PAGE 1</h4>
              <div className="ad-units">
                <div className="placeholder-wrap">
                  Placeholder[157]
                  <div className="ez">
                    <EzoicPlaceHolder id={157} />
                  </div>
                </div>
                <div className="placeholder-wrap">
                  Placeholder[158]
                  <div className="ez common">
                    <EzoicPlaceHolder id={158} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === 2 && (
            <div className="ads">
              <h4>PAGE 2</h4>
              <div className="ad-units">
                <div className="placeholder-wrap">
                  Placeholder[158]
                  <div className="ez common">
                    <EzoicPlaceHolder id={158} />
                  </div>
                </div>
                <div className="placeholder-wrap">
                  Placeholder[159]
                  <div className="ez">
                    <EzoicPlaceHolder id={159} />
                  </div>
                </div>
                <div className="placeholder-wrap">
                  Placeholder[160]
                  <div className="ez">
                    <EzoicPlaceHolder id={160} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        button {
          background: #000;
          color: white;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .placeholder-wrap {
          text-align: center;
        }

        .navigation {
          border: 1px solid #bbb;
          padding: 20px;
          margin-bottom: 30px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          margin-right: 30px;
          width: 300px;
        }

        .ad-units {
          display: flex;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .buttons button {
          margin-bottom: 20px;
        }

        .page {
          border: 1px solid #bbb;
          padding: 20px;
          display: flex;
        }

        .ads {
          flex: 1;
          max-width: 70%;
        }

        .page-ads {
          display: flex;
          flex-wrap: wrap;
        }

        .ad-testing {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 50px;
        }

        .ez {
          background: #ccc;
          width: 336px;
          height: 280px;
          margin: 10px;
        }

        .common {
          background: pink;
        }
      `}</style>
    </>
  );
};

export default AdTesting;
