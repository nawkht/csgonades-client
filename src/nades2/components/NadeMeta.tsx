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
        <h4>Type</h4>
        <p>{nade.type ? nadeTypeString(nade.type) : "Not set."}</p>
        <h4>Movement</h4>
        <p>{nade.movement ? capitalize(nade.movement) : "Not set."}</p>
        <h4>Technique</h4>
        <p>{nade.technique ? techniqueString(nade.technique) : "Not set."}</p>
        {nade.tickrate && (
          <>
            <h4>Tickrate</h4>
            <p>{tickrateString(nade.tickrate)}</p>
          </>
        )}
      </div>
      <style jsx>{`
        .nade-meta {
          background: #17a58b;
          padding: 30px 20px;
          border-radius: 5px;
          margin-right: 40px;
          margin-bottom: 30px;
          margin-top: 30px;
          min-width: 200px;
          color: white;
        }

        h4 {
          margin: 0;
          padding: 0;
          font-size: 14px;
          font-weight: normal;
        }
      `}</style>
    </>
  );
};
