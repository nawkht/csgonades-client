import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../../utils/DateUtils";

type Props = {
  nade: Nade;
};

export const NadeDetails: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-details">
        <div className="nade-user">
          <img src={nade.user.avatar} /> <span>{nade.user.nickname}</span>
        </div>

        <div className="nade-stats">
          <span>
            {nade.viewCount} views | {nade.favoriteCount} favorites |{" "}
            {prettyDate(nade.createdAt)}
          </span>
        </div>
      </div>
      <style jsx>{`
        .nade-details {
          background: ${colors.boxTitleBg};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nade-stats {
          font-size: 14px;
          color: #a0a0a0;
        }

        .nade-user {
          display: flex;
          align-items: center;
          color: ${colors.TEXT};
        }

        .nade-user img {
          width: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};
