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
          <ReportNadeButton nadeId={nade.id} />
        </div>
        <div className="action">
          <FavoriteButton showSignInWarning={onShowSignInWarning} nade={nade} />
        </div>
      </div>
      <style jsx>{`
        .nade-info-actions {
          display: flex;
          width: calc(300px + 30px);
          margin: 0 auto;
          padding-top: 30px;
          padding-bottom: 30px;
          justify-content: space-between;
        }

        .action {
          width: 150px;
        }
      `}</style>
    </>
  );
};
