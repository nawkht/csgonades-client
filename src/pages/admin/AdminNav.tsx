import { FC } from "react";
import { Menu, Label, MenuItemProps } from "semantic-ui-react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { AdminRoutes } from "../../store/AdminStore/AdminActions";

export const AdminNav: FC = () => {
  const { route, changeAdminRoute } = useAdminPage();

  const handleItemClick = (e: any, { name }: MenuItemProps) => {
    const newRoute = name as AdminRoutes;
    changeAdminRoute(newRoute);
  };

  return (
    <div>
      <Menu vertical>
        <Menu.Item
          name="pending-nades"
          active={route === "pending-nades"}
          onClick={handleItemClick}
        >
          <Label color="teal">1</Label>
          Pending nades
        </Menu.Item>

        <Menu.Item
          name="user"
          active={route === "user"}
          onClick={handleItemClick}
        >
          <Label>51</Label>
          Users
        </Menu.Item>
      </Menu>
    </div>
  );
};
