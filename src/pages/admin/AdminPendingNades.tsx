import { FC, useEffect } from "react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import { NadeList } from "../../ui-common/NadeList";

export const AdminPendingNades: FC = () => {
  const { fetchPendingNades, pendingNades } = useAdminPage();

  useEffect(() => {
    fetchPendingNades();
  }, []);

  return <NadeList nades={pendingNades} emptyMessage="No pending nades!" />;
};
