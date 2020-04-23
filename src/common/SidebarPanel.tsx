import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  title: string;
  titleComp?: any;
};

export const SidebarPanel: FC<Props> = ({ title, children, titleComp }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="sidebar-panel">
        <div className="sidebar-title">
          {title}
          {titleComp}
        </div>
        <div className="sidebar-content">{children}</div>
      </div>
      <style jsx>{`
        .sidebar-panel {
          background: ${colors.DP02};
        }
        .sidebar-title {
          padding: 12px 30px;
          background ${colors.PRIMARY};
          color: white;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sidebar-content {
          padding: 20px 30px 20px 30px;
        }
        `}</style>
    </>
  );
};
