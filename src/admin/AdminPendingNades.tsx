import { FC, useEffect } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { useAdminPage } from "../store/AdminStore/AdminHooks";

export const AdminPendingNades: FC = () => {
  const { fetchPendingNades, pendingNades } = useAdminPage();

  useEffect(() => {
    fetchPendingNades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NadeListGrid nades={pendingNades} emptyMessage="No pending nades!" />;
};
