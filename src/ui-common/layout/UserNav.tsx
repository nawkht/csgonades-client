import { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import Link from "next/link";
import { Colors } from "../../../constants/colors";
import { Icon } from "semantic-ui-react";

const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com/auth/steam"
    : "http://localhost:5000/auth/steam";

export const UserNav: FC = () => {
  const user = useSelector(userSelector);

  if (!user) {
    return (
      <>
        <a href={AUTH_URL} className="steam-login">
          Sign inn
        </a>
      </>
    );
  } else {
    return (
      <>
        <div className="user-nav">
          <Link href="/newnade">
            <a className="add-nade-btn">
              <Icon name="plus" size="small" />
              <span>ADD NADE</span>
            </a>
          </Link>

          <span className="user-nav-user">
            {user.avatar && <img className="user-avatar" src={user.avatar} />}
            {user.nickname}
          </span>
        </div>
        <style jsx>{`
          .user-nav {
            align-self: center;
            padding-right: 18px;
            display: flex;
          }

          .user-nav-user {
            display: flex;
            align-self: center;
          }

          .add-nade-btn {
            align-self: center;
            margin-right: 18px;
            padding: 6px 12px;
            border-radius: 3px;
            background: ${Colors.SUCCESS};
            color: white;
            font-weight: bold;
            font-size: 0.9em;
            display: flex;
            align-items: center;
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
  }
};
