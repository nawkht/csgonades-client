import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { UserList } from "./UserList";

export const AdminUsers: FC = () => {
  const { uiDimensions } = useTheme();

  return (
    <>
      <div className="users">
        <UserList />
      </div>
      <style jsx>{`
        .users {
          background: white;
          border-radius: ${uiDimensions.BORDER_RADIUS};
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
