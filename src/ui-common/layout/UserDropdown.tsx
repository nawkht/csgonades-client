import { FC } from "react";
import { User } from "../../models/User";
import { Dropdown } from "semantic-ui-react";
import Router from "next/router";
import { useSignOut } from "../../store/AuthStore/AuthHooks";
import { redirectUserPage } from "../../utils/Common";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const signOut = useSignOut();
  function onProfileClick() {
    redirectUserPage(user.steamID);
  }

  function onFavoritesClick() {
    Router.push(`/favorites`);
  }

  return (
    <>
      <span className="user-nav-user">
        {user.avatar && <img className="user-avatar" src={user.avatar} />}
        <Dropdown text={user.nickname}>
          <Dropdown.Menu direction="left">
            <Dropdown.Item
              text="Profile"
              icon="user"
              onClick={onProfileClick}
            />
            <Dropdown.Item
              text="Favorites"
              icon="star"
              onClick={onFavoritesClick}
            />
            <Dropdown.Divider />
            <Dropdown.Item
              text="Sign out"
              icon="sign out alternate"
              onClick={signOut}
            />
          </Dropdown.Menu>
        </Dropdown>
      </span>
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
      `}</style>
    </>
  );
};
