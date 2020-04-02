import { FC } from "react";
import { ReportNadeButton } from "./components/ReportNadeButtons";
import { FavoriteButton } from "./components/FavoriteButton";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nade: Nade;
  onShowSignInWarning: () => void;
};

export const NadeActions: FC<Props> = ({ nade, onShowSignInWarning }) => {
  return (
    <>
      <div className="nade-info-actions">
        <div className="action">
          <FavoriteButton showSignInWarning={onShowSignInWarning} nade={nade} />
        </div>
        <div className="action">
          <ReportNadeButton nadeId={nade.id} />
        </div>
      </div>
      <style jsx>{`
        .nade-info-actions {
          display: flex;
          flex-direction: column;
        }

        .action {
          width: 100%;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};
