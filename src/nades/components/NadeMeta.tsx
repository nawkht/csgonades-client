import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import {} from "../../models/Nade/NadeMovement";
import { tickrateString } from "../../models/Nade/NadeTickrate";
import { nadeTypeString } from "../../models/Nade/NadeType";
import { techniqueString } from "../../models/Nade/Technique";
import { capitalize } from "../../utils/Common";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { EditButton } from "./EditButton";

type Props = {
  nade: Nade;
  onEditMeta: () => void;
};

export const NadeMeta: FC<Props> = ({ nade, onEditMeta }) => {
  const allowEdit = useCanEditNade(nade);

  return (
    <>
      <EditButton allowEdit={allowEdit} onClick={onEditMeta}>
        <div className="nade-meta">
          <div className="nade-meta-item">
            <h4>Type</h4>
            <span>{nade.type ? nadeTypeString(nade.type) : "Not set."}</span>
          </div>

          <div className="nade-meta-item">
            <h4>Movement</h4>
            <span>
              {nade.movement ? capitalize(nade.movement) : "Not set."}
            </span>
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
      </EditButton>
      <style jsx>{`
        .nade-meta {
          display: flex;
          flex-direction: column;
          color: white;
        }

        .nade-meta-item {
          text-align: center;
          flex: 1;
          white-space: nowrap;
          padding: 10px;
          background: #17a58b;
          border-bottom: 1px solid #12826e;
        }

        .nade-meta-item:first-child {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .nade-meta-item:last-child {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          border-bottom: none;
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

        @media only screen and (max-width: 1000px) {
          .nade-meta {
            flex-direction: row;
            margin: 0 auto;
          }

          .nade-item {
            border-radius: 0px;
            border-bottom: 0px;
          }

          .nade-meta-item:first-child {
            border: none;
            border-radius: 0px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }

          .nade-meta-item:last-child {
            border-radius: 0px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-right: none;
          }

          span {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};
