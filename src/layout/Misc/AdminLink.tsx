import Link from "next/link";
import { FC } from "react";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

const AdminLink: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const isAdminOrMod = useIsAdminOrModerator();

  if (!isAdminOrMod) {
    return null;
  }

  return (
    <>
      <div className="admin-link-box">
        <Link href="/admin" as="/admin" prefetch={false}>
          <a className="admin-link">Dashboard</a>
        </Link>
      </div>
      <style jsx>{`
        .admin-link-box {
          position: fixed;
          top: 10px;
          left: 10px;
          background: white;
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP01};
          border-radius: 5px;
        }

        .admin-link {
          display: block;
          padding: 10px 20px;
          color: #444;
        }
      `}</style>
    </>
  );
};

export default AdminLink;
