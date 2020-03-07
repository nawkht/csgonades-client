import Link from "next/link";
import { FC } from "react";
import { useIsAdminOrModerator } from "../../../store/AuthStore/AuthHooks";

type Props = {};

export const AdminLink: FC<Props> = ({}) => {
  const isAdminOrMod = useIsAdminOrModerator();

  if (!isAdminOrMod) {
    return null;
  }

  return (
    <>
      <div className="admin-link-box">
        <Link href="/admin" as="/admin">
          <a className="admin-link">Dashboard</a>
        </Link>
      </div>
      <style jsx>{`
        .admin-link-box {
          position: fixed;
          bottom: 0;
          left: 0;
          background: white;
          border-top: 1px solid #bbb;
          border-right: 1px solid #bbb;
          border-top-right-radius: 5px;
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
