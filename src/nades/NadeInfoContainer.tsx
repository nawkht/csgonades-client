import { FC } from "react";
import { NadeInfo } from "./components/NadeInfo";
import { FavoriteButton } from "./components/FavoriteButton";
import { ReportNadeButton } from "./components/ReportNadeButtons";
import { Nade } from "../models/Nade/Nade";

type Props = {
  nade: Nade;
  onEditDescription: () => void;
  onEditMeta: () => void;
  onShowSignInWarning: () => void;
};

export const NadeInfoContainer: FC<Props> = ({
  nade,
  onEditDescription,
  onEditMeta,
  onShowSignInWarning,
}) => {
  return (
    <>
      <div className="nade-info">
        <div className="nade-info-actions">
          <div className="action">
            <ReportNadeButton nadeId={nade.id} />
          </div>
          <div className="action">
            <FavoriteButton
              showSignInWarning={onShowSignInWarning}
              nade={nade}
            />
          </div>
        </div>
        <div className="nade-info-description">
          <NadeInfo
            nade={nade}
            onEditTitle={onEditDescription}
            onEditMeta={onEditMeta}
          />
        </div>
      </div>
      <style jsx>{`
        .nade-info-actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 30px;
        }

        .nade-info {
          margin-bottom: 30px;
        }

        .action {
          width: 150px;
          margin-left: 30px;
        }
      `}</style>
    </>
  );
};
