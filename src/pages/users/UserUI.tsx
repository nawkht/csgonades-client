import { FC } from "react";
import { User } from "../../models/User";
import { formatDate } from "../../models/DateFormater";
import { Colors } from "../../../constants/colors";

type Props = {
  user: User;
};

export const UserUI: FC<Props> = ({ user }) => {
  return (
    <>
      <div className="user-container">
        <div className="user-details">
          <h1>
            <img src={user.avatar || ""} /> {user.nickname}
          </h1>
          <span>{user.role}</span>
          <br />
          <span>{formatDate(user.createdAt)}</span>
          <br />
          <span>{user.bio}</span>
        </div>
        <div className="user-nades">
          <h2>Nades by {user.nickname}</h2>
        </div>
      </div>
      <style jsx>{`
        .user-container {
          margin: 18px;
          display: flex;
        }

        .user-details {
          background: white;
          margin-right: 18px;
          padding: 12px;
          flex: 1;
          max-width: 300px;
          border: 1px solid ${Colors.PRIMARY_BORDER};
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
      `}</style>
    </>
  );
};
