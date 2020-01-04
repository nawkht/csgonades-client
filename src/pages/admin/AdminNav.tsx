import { FC, useEffect } from "react";
import { Menu, Label, MenuItemProps } from "semantic-ui-react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { AdminRoutes } from "../../store/AdminStore/AdminActions";
import { useSiteStats } from "../../store/GlobalStore/GlobalHooks";

export const AdminNav: FC = () => {
  const { route, changeAdminRoute } = useAdminPage();
  const { fetchSiteStats, stats } = useSiteStats();

  useEffect(() => {
    fetchSiteStats();
  }, []);

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
          <Label>{stats.numPending}</Label>
          Pending nades
        </Menu.Item>

        <Menu.Item
          name="user"
          active={route === "user"}
          onClick={handleItemClick}
        >
          <Label>{stats.numUsers}</Label>
          Users
        </Menu.Item>
      </Menu>
    </div>
  );
};
