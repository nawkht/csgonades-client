import { FC, useMemo } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  title: string;
  titleComp?: any;
  first?: boolean;
  last?: boolean;
};

export const SidebarPanel: FC<Props> = ({
  title,
  children,
  titleComp,
  first,
  last,
}) => {
  const { colors } = useTheme();

  const classNames = useMemo(() => {
    const base = ["sidebar-panel"];
    if (first) {
      base.push("first");
    }
    if (last) {
      base.push("last");
    }
    return base.join(" ");
  }, [first, last]);

  return (
    <>
      <div className={classNames}>
        <div className="sidebar-title">
          {title}
          {titleComp}
        </div>
        <div className="sidebar-content">{children}</div>
      </div>
      <style jsx>{`
        .sidebar-panel {
          background: ${colors.DP02};
          overflow: hidden;
        }

        .first {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .last {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .sidebar-title {
          padding: 12px 30px;
          background ${colors.PRIMARY};
          color: white;
          font-size: 12px;
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
