import { FC } from "react";
import { NadeInfo } from "./components/NadeInfo";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nade: Nade;
  onEditDescription: () => void;
};

export const NadeInfoContainer: FC<Props> = ({ nade, onEditDescription }) => {
  return (
    <>
      <div className="nade-info">
        <div className="nade-info-description">
          <NadeInfo nade={nade} onEditTitle={onEditDescription} />
        </div>
      </div>
      <style jsx>{`
        .nade-info {
        }
      `}</style>
    </>
  );
};
