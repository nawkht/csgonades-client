import { FC } from "react";
import { User } from "../../models/User";
import { formatDate } from "../../models/DateFormater";
import { capitalize } from "../../utils/Common";
import { NadeList } from "../../ui-common/NadeList";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

type Props = {
  user: User;
  nades: NadeLight[];
};

export const UserUI: FC<Props> = ({ user, nades }) => {
  const { colors, isMobile, uiDimensions } = useTheme();

  return (
    <>
      <div className="user-container">
        <div className="user-details">
          <h1>
            <img src={user.avatar || ""} /> {user.nickname}
          </h1>
          {user.role !== "user" && (
            <span className="user-role-badge">{capitalize(user.role)}</span>
          )}
          <br />
          <span>Member since: {formatDate(user.createdAt)}</span>
          <br />
          <br />
          <span className="bio">{user.bio}</span>
        </div>
        <div className="user-nades">
          <h2>Nades by {user.nickname}</h2>
          <NadeList nades={nades} />
        </div>
      </div>
      <style jsx>{`
        .user-container {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          display: flex;
          flex-direction: ${isMobile ? "column" : "row"};
        }

        .user-details {
          position: relative;
          background: white;
          margin-right: ${isMobile ? "0px" : "18px"};
          padding: 12px;
          width: ${isMobile ? "100%" : "300px"};
          border: 1px solid ${colors.PRIMARY_BORDER};
          align-self: flex-start;
          border-radius: 3px;
          margin-bottom: ${isMobile ? uiDimensions.INNER_GUTTER_SIZE : 0}px;
        }

        .user-details h1 {
          display: flex;
          align-items: center;
          font-size: 1.2em;
        }

        .user-details img {
          border-radius: 50%;
          width: 30px;
          margin-right: 12px;
        }

        .user-role-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.8em;
          padding: 3px 6px;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};
