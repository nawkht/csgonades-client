import { Nade, Status, StatusInfo } from "../../../models/Nade";
import { FC } from "react";
import { StatusEditor } from "./StatusEditor";
import { ForceUserSettings } from "./ForceUserSettings";
import { useUpdateNadeStatus } from "../../../store/NadeStore/NadeActions";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade, onDismiss }) => {
  const updateNadeStatus = useUpdateNadeStatus();

  function onStatusSave(status: Status, statusInfo?: StatusInfo) {
    updateNadeStatus(nade.id, { status, statusInfo });
    onDismiss();
  }

  return (
    <div>
      <h3>Nade Status</h3>
      <StatusEditor
        status={nade.status}
        statusInfo={nade.statusInfo}
        onSave={onStatusSave}
      />
      <h3>Force User</h3>
      <ForceUserSettings nadeId={nade.id} />
      <h3>Force Stats</h3>
    </div>
  );
};
