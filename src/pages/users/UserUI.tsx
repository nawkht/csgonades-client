import { FC } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { User } from "../../models/User";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import {
  useUsersActions,
  useUsersState
} from "../../store/UsersStore/UsersHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { UserDetails } from "./UserDetails";
import { UserEditor } from "./UserEditor";

type Props = {
  user: User;
  nades: NadeLight[];
};

export const UserUI: FC<Props> = ({ user, nades }) => {
  const { isMobile, uiDimensions } = useTheme();
  const { startEditingUser } = useUsersActions();
  const { isEditing } = useUsersState();

  return (
    <>
      <div className="user-container">
        <UserDetails
          isEditing={isEditing}
          user={user}
          onEditClick={startEditingUser}
        />
        <UserEditor user={user} />
        <div className="user-nades">
          <h2>Nades by {user.nickname}</h2>
          <NadeListGrid nades={nades} />
        </div>
      </div>
      <style jsx>{`
        .user-container {
          position: relative;
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          display: flex;
          flex-direction: ${isMobile ? "column" : "row"};
        }

        .user-nades {
          flex: 1;
        }
      `}</style>
    </>
  );
};
