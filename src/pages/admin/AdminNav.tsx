import { FC, useEffect } from "react";
import { Label, Menu, MenuItemProps } from "semantic-ui-react";
import { AdminRoutes } from "../../store/AdminStore/AdminActions";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { useSiteStats } from "../../store/GlobalStore/GlobalHooks";

export const AdminNav: FC = () => {
  const { route, changeAdminRoute } = useAdminPage();
  const { fetchSiteStats, stats } = useSiteStats();

  useEffect(() => {
    fetchSiteStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Menu.Item
          name="reports"
          active={route === "reports"}
          onClick={handleItemClick}
        >
          Reports
        </Menu.Item>
        <Menu.Item
          name="tournaments"
          active={route === "tournaments"}
          onClick={handleItemClick}
        >
          Add tournament
        </Menu.Item>
        <Menu.Item
          name="write-article"
          active={route === "write-article"}
          onClick={handleItemClick}
        >
          New article
        </Menu.Item>
      </Menu>
    </div>
  );
};
