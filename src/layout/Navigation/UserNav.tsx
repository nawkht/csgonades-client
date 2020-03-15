import { useRouter } from "next/router";
import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonWithIcon } from "../../common/ButtonWithIcon";
import { NotificationIndicator } from "../../common/notifications/NotificationIndicator";
import { Dimensions } from "../../constants/Constants";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import { SignInnButton } from "../Misc/SignInnButton";
import { UserDropdown } from "../Misc/UserDropdown";

export const UserNav: FC = memo(() => {
  const router = useRouter();
  const user = useSelector(userSelector);

  if (!user) {
    return <SignInnButton />;
  } else {
    return (
      <>
        <div className="user-nav">
          <NotificationIndicator />
          <div className="user-new-nade">
            <ButtonWithIcon
              onClick={() => {
                router.push("/newnade", "/newnade");
              }}
              small
              icon={<FaPlus />}
              value="ADD NADE"
              backgroundColor="#56a100"
            />
          </div>
          <UserDropdown user={user} />
        </div>
        <style jsx>{`
          .user-nav {
            align-self: center;
            display: flex;
            align-items: center;
          }

          .user-new-nade {
            margin-right: 20px;
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
