import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
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
          <span>{nade.type ? nadeTypeString(nade.type) : "Not set."}</span>
        </div>

        <div className="nade-meta-item">
          <h4>Movement</h4>
          <span>{nade.movement ? capitalize(nade.movement) : "Not set."}</span>
        </div>

        <div className="nade-meta-item">
          <h4>Technique</h4>
          <span>
            {nade.technique ? techniqueString(nade.technique) : "Not set."}
          </span>
        </div>

        {nade.tickrate && (
          <div className="nade-meta-item">
            <h4>Tickrate</h4>
            <span>{tickrateString(nade.tickrate)}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .nade-meta {
          display: flex;
          color: white;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          overflow: hidden;
        }

        .nade-meta-item {
          text-align: center;
          flex: 1;
          white-space: nowrap;
          padding: 10px;
          background: #729b79;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
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

        span {
          font-size: 16px;
        }
      `}</style>
    </>
  );
};
