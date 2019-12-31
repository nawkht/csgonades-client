import { FC, useState, useEffect } from "react";
import { User } from "../../models/User";
import { NadeList } from "../../ui-common/NadeList";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { UserDetails } from "./UserDetails";
import { UserEditor } from "./UserEditor";
import {
  useUsersActions,
  useUsersState
} from "../../store/UsersStore/UsersHooks";

type Props = {
  user: User;
  nades: NadeLight[];
};

export const UserUI: FC<Props> = ({ user, nades }) => {
  const { isMobile, uiDimensions } = useTheme();
  const { startEditingUser } = useUsersActions();
  const { isEditing } = useUsersState();

  const numItemsPerRow = isMobile ? 1 : 3;

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
          <NadeList numItemsPerRow={numItemsPerRow} nades={nades} />
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
