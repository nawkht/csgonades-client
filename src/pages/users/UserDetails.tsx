import { FC } from "react";
import { Button } from "semantic-ui-react";
import { formatDate } from "../../models/DateFormater";
import { User } from "../../models/User";
import { useIsAllowedUserEdit } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { capitalize } from "../../utils/Common";
import { dateFromNow } from "../../utils/DateUtils";

type Props = {
  isEditing: boolean;
  user: User;
  onEditClick: () => void;
};

export const UserDetails: FC<Props> = ({ isEditing, user, onEditClick }) => {
  const { colors, isMobile, uiDimensions } = useTheme();
  const allowEdit = useIsAllowedUserEdit(user);

  if (isEditing) {
    return null;
  }

  return (
    <>
      <div className="user-details">
        <h1>
          <img src={user.avatar || ""} alt={`avatar for ${user.nickname}`} />{" "}
          {user.nickname}
        </h1>
        {user.role !== "user" && (
          <span className="user-role-badge">{capitalize(user.role)}</span>
        )}

        <div className="member-since">
          <span>Member since</span> {formatDate(user.createdAt)}
        </div>

        {allowEdit && user.lastActive && (
          <div className="member-since">
            <span>Last active</span> {dateFromNow(user.lastActive)}
          </div>
        )}

        {!!user.bio && <div className="bio">{user.bio}</div>}
        {allowEdit && (
          <Button fluid onClick={onEditClick}>
            EDIT USER
          </Button>
        )}
      </div>
      <style jsx>{`
        .user-details {
          position: relative;
          background: white;
          margin-right: ${isMobile ? "0px" : "18px"};
          padding: 12px;
          width: ${isMobile ? "100%" : "400px"};
          border: 1px solid ${colors.PRIMARY_BORDER};
          align-self: flex-start;
          border-radius: ${uiDimensions.BORDER_RADIUS};
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

        .member-since {
          margin-bottom: 12px;
        }

        .member-since span {
          font-weight: normal;
          margin-right: 6px;
        }

        .bio {
          margin-bottom: 12px;
        }

        .user-role-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.8em;
          padding: 3px 6px;
          border-radius: ${uiDimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
