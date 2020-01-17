import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { userSelector } from "../../store/AuthStore/AuthSelectors";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { NotificationIndicator } from "../notifications/NotificationIndicator";
import { SignInnButton } from "./SignInnButton";
import { UserDropdown } from "./UserDropdown";

export const UserNav: FC = () => {
  const { colors, isMobile, uiDimensions } = useTheme();
  const user = useSelector(userSelector);

  if (!user) {
    return <SignInnButton />;
  } else {
    return (
      <>
        <div className="user-nav">
          <NotificationIndicator />
          {!isMobile && (
            <Link href="/newnade">
              <a className="add-nade-btn">
                <Icon name="plus" size="small" />
                <span>ADD NADE</span>
              </a>
            </Link>
          )}

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
            border-radius: ${uiDimensions.BORDER_RADIUS};
            background: ${colors.SUCCESS};
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
