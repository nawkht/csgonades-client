import { FC } from "react";
import { NadeInfo } from "./components/NadeInfo";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nade: Nade;
  onEditDescription: () => void;
  onEditMeta: () => void;
};

export const NadeInfoContainer: FC<Props> = ({
  nade,
  onEditDescription,
  onEditMeta,
}) => {
  return (
    <>
      <div className="nade-info">
        <div className="nade-info-description">
          <NadeInfo
            nade={nade}
            onEditTitle={onEditDescription}
            onEditMeta={onEditMeta}
          />
        </div>
      </div>
      <style jsx>{`
        .nade-info {
          max-width: 700px;
          margin: 0 auto;
          padding-bottom: 30px;
        }
      `}</style>
    </>
  );
};
