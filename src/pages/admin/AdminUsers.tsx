import { FC, useEffect } from "react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { prettyDate } from "../../utils/DateUtils";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import Link from "next/link";

export const AdminUsers: FC = () => {
  const { colors, uiDimensions } = useTheme();
  const { users, fetchUsers } = useAdminPage();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="users">
        {users.map(user => (
          <Link
            href={`/users?id=${user.steamId}`}
            as={`/users/${user.steamId}`}
            key={user.steamId}
          >
            <a className="user">
              <img src={user.avatar} />
              <span className="nickname">{user.nickname}</span>
              <span className="created-at">{prettyDate(user.createdAt)}</span>
              <span className="last-active">{prettyDate(user.lastActive)}</span>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .users {
          background: white;
          border-radius: ${uiDimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .user {
          display: flex;
          align-items: center;
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          padding: 6px;
          color: #444;
        }

        .nickname {
          flex: 1;
        }

        .created-at {
          margin-right: 18px;
        }

        .user img {
          width: 30px;
          margin-right: 6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
