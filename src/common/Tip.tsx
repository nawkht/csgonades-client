import { FC } from "react";
import { LayerPosition } from "../constants/Constants";

type Props = {
  visisble: boolean;
  onClick: () => void;
};

export const Tip: FC<Props> = ({ children, visisble, onClick }) => {
  return (
    <>
      <div className="tip-container">
        {children}
        <div className={visisble ? "tip" : "tip hidden"}>
          <div className="arrow-up"></div>
          <div className="tip-content">
            <h4 className="tip-title">TIP</h4>
            <p>Click here to show the map!</p>
            <button onClick={onClick}>Got it!</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tip-container {
          position: relative;
          z-index: ${LayerPosition.UNDER_UI};
        }

        .tip {
          position: absolute;
          top: 100%;
          left: 0;
          display: flex;
          flex-direction: column;
          min-width: 200px;
        }

        .tip-title {
          font-weight: bold;
          font-size: 1em;
          padding: 0;
          margin: 0;
          margin-bottom: 3px;
        }

        .hidden {
          display: none;
        }

        .tip-content {
          background: black;
          color: white;
          border-radius: 4px;
          padding: 12px;
          font-size: 0.9em;
          display: flex;
          flex-direction: column;
        }

        .tip-content button {
          background: black;
          border: 1px solid white;
          border-radius: 4px;
          color: white;
          margin-top: 6px;
          outline: none;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
          padding: 6px;
        }

        .tip-content button:hover {
          opacity: 1;
        }

        .tip-content p {
          margin: 0;
        }

        .arrow-up {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid black;
          margin-left: 12px;
          margin-top: 6px;
        }
      `}</style>
    </>
  );
};
