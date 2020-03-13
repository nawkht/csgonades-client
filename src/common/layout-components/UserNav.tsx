import Link from "next/link";
import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { Dimensions } from "../../constants/Constants";
import { useTrySignIn } from "../../store/AuthStore/AuthHooks";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import { NotificationIndicator } from "../notifications/NotificationIndicator";
import { SignInnButton } from "./SignInnButton";
import { UserDropdown } from "./UserDropdown";

export const UserNav: FC = memo(() => {
  const trySignIn = useTrySignIn();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!user) {
      console.log("> Trying to sign in");
      trySignIn();
    }
  }, [user, trySignIn]);

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

          @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
            .new-nade-btn {
              display: none;
            }
          }
        `}</style>
      </>
    );
  }
});
