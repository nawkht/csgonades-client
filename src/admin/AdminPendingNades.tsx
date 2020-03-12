import { FC } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { useAdminPendingNades } from "../store2/AdminStore/hooks";

export const AdminPendingNades: FC = () => {
  const { pendingNades } = useAdminPendingNades();

  return <NadeListGrid nades={pendingNades} emptyMessage="No pending nades!" />;
};
