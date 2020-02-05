import { FC, useEffect } from "react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";

export const AdminPendingNades: FC = () => {
  const { fetchPendingNades, pendingNades } = useAdminPage();

  useEffect(() => {
    fetchPendingNades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <NadeListGrid nades={pendingNades} emptyMessage="No pending nades!" />;
};
