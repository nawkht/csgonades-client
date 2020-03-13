import Link from "next/link";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { User } from "../../models/User";
import { useSignOut } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const signOut = useSignOut();

  return (
    <>
      <div className="user-nav-user">
        <Link href={`/users/[user]`} as={`/users/${user.steamId}`}>
          <a className="user-link">
            {user.avatar && (
              <img
                className="user-avatar"
                src={user.avatar}
                alt={`avatar for ${user.nickname}`}
              />
            )}
            <div>{user.nickname}</div>
          </a>
        </Link>

        <button className="logout-btn" onClick={signOut}>
          <FiLogOut />
        </button>
      </div>
      <style jsx>{`
        .user-nav-user {
          display: flex;
          align-self: center;
        }

        .user-avatar {
          align-self: center;
          width: 20px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .user-link {
          display flex;
          align-items: center;
          color: ${colors.TEXT};
        }

        .logout-btn {
          margin-left: 12px;
          position: relative;
          color: ${colors.TEXT};
          background: rgba(171, 0, 0, 0.0);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          transition: background 0.15s;
          border: none;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: rgba(171, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};
