import { Nade, Status, StatusInfo } from "../../../models/Nade";
import { FC, useState } from "react";
import { StatusEditor } from "./StatusEditor";
import { ForceUserSettings } from "./ForceUserSettings";
import { useUpdateNadeStatus } from "../../../store/NadeStore/NadeActions";
import { useDeleteNade } from "../../../store/NadeStore/NadeHooks";
import { Input, Button } from "semantic-ui-react";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade, onDismiss }) => {
  const updateNadeStatus = useUpdateNadeStatus();
  const deleteNade = useDeleteNade();
  const [deleteConfimMessage, setDeleteConfimMessage] = useState("");

  function onStatusSave(status: Status, statusInfo?: StatusInfo) {
    updateNadeStatus(nade.id, { status, statusInfo });
    onDismiss();
  }

  function onDelete() {
    if (deleteConfimMessage === "DELETE") {
      deleteNade(nade.id);
    }
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
      <h3>Delete</h3>
      <p>Write "DELETE":</p>
      <Input
        value={deleteConfimMessage}
        onChange={(_, text) => {
          setDeleteConfimMessage(text.value);
        }}
      />
      <Button onClick={onDelete}>DELETE</Button>
    </div>
  );
};
