import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import { NotificationIndicator } from "../notifications/NotificationIndicator";
import { SignInnButton } from "./SignInnButton";
import { UserDropdown } from "./UserDropdown";

export const UserNav: FC = () => {
  const user = useSelector(userSelector);

  if (!user) {
    return <SignInnButton />;
  } else {
    return (
      <>
        <div className="user-nav">
          <NotificationIndicator />
          <Link href="/newnade">
            <a className="new-nade-btn">
              <Button
                content="Add nade"
                icon="plus"
                labelPosition="left"
                color="olive"
              />
            </a>
          </Link>
          <UserDropdown user={user} />
        </div>
        <style jsx>{`
          .user-nav {
            align-self: center;
            display: flex;
            align-items: center;
          }

          .new-nade-btn {
            margin-right: 18px;
          }
        `}</style>
      </>
    );
  }
};
