import { FC } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import Link from "next/link";
import { Colors } from "../../../constants/colors";
import { Icon } from "semantic-ui-react";
import { UserDropdown } from "./UserDropdown";
import { SignInnButton } from "./SignInnButton";

export const UserNav: FC = () => {
  const user = useSelector(userSelector);

  if (!user) {
    return <SignInnButton />;
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

          <UserDropdown user={user} />
        </div>
        <style jsx>{`
          .user-nav {
            align-self: center;
            padding-right: 18px;
            display: flex;
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
        `}</style>
      </>
    );
  }
};
