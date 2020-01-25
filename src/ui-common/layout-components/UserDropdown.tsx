import Link from "next/link";
import Router from "next/router";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { Popup } from "semantic-ui-react";
import { User } from "../../models/User";
import {
  useIsAdminOrModerator,
  useSignOut
} from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { redirectUserPage } from "../../utils/Common";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const isAdminOrMod = useIsAdminOrModerator();
  const signOut = useSignOut();
  function onProfileClick() {
    redirectUserPage(user.steamId);
  }

  function onAdminClick() {
    Router.push(`/admin`);
  }

  return (
    <>
      <div className="user-nav-user">
        <Link href={`/users?id=${user.steamId}`} as={`/users/${user.steamId}`}>
          <a className="user-link">
            {user.avatar && (
              <img
                className="user-avatar"
                src={user.avatar}
                alt={`avatar for ${user.nickname}`}
              />
            )}
            <div>{user.nickname}</div>
            <Popup
              content="Sign out"
              mouseEnterDelay={200}
              openOnTriggerClick={false}
              inverted
              size="mini"
              position="bottom center"
              trigger={
                <div className="logout-btn">
                  <FiLogOut />
                </div>
              }
            />
          </a>
        </Link>
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
        }

        .logout-btn:hover {
          background: rgba(171, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};
