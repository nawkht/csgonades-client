import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import {} from "../../models/Nade/NadeMovement";
import { tickrateString } from "../../models/Nade/NadeTickrate";
import { nadeTypeString } from "../../models/Nade/NadeType";
import { techniqueString } from "../../models/Nade/Technique";
import { capitalize } from "../../utils/Common";

type Props = {
  nade: Nade;
};

export const NadeMeta: FC<Props> = ({ nade }) => {
  return (
    <>
      <div className="nade-meta">
        <div className="nade-meta-item">
          <h4>Type</h4>
          <p>{nade.type ? nadeTypeString(nade.type) : "Not set."}</p>
        </div>

        <div className="nade-meta-item">
          <h4>Movement</h4>
          <p>{nade.movement ? capitalize(nade.movement) : "Not set."}</p>
        </div>

        <div className="nade-meta-item">
          <h4>Technique</h4>
          <p>{nade.technique ? techniqueString(nade.technique) : "Not set."}</p>
        </div>

        {nade.tickrate && (
          <div className="nade-meta-item">
            <h4>Tickrate</h4>
            <p>{tickrateString(nade.tickrate)}</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .nade-meta {
          display: flex;
          color: white;
          max-width: 100%;
          overflow-x: auto;
        }

        .nade-meta-item {
          text-align: center;
          flex: 1;
          white-space: nowrap;
          border-right: 1px solid #138a74;
          padding: 15px;
          background: #17a58b;
        }

        .nade-meta-item:last-child {
          border-right: none;
        }

        h4 {
          margin: 0;
          padding: 0;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        p {
          font-size: 16px;
        }

        @media only screen and (max-width: 900px) {
          .nade-meta {
            flex-wrap: wrap;
            flex-direction: row;
          }
          .nade-meta-item {
            padding: 10px;
            min-width: 50%;
            border-bottom: 1px solid #138a74;
          }

          .nade-meta-item:nth-child(2) {
            border-right: none;
          }

          .nade-meta-item:nth-child(4) {
            border-right: none;
          }
        }
      `}</style>
    </>
  );
};
