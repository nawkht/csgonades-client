import { Nade, Status, StatusInfo } from "../../../models/Nade/Nade";
import { FC, useState } from "react";
import { StatusEditor } from "./StatusEditor";
import { ForceUserSettings } from "./ForceUserSettings";
import { useUpdateNadeStatus } from "../../../store/NadeStore/NadeActions";
import {
  useDeleteNade,
  useForceNadeYear
} from "../../../store/NadeStore/NadeHooks";
import { Input, Button } from "semantic-ui-react";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade, onDismiss }) => {
  const updateNadeStatus = useUpdateNadeStatus();
  const forceNadeYear = useForceNadeYear();
  const deleteNade = useDeleteNade();
  const [deleteConfimMessage, setDeleteConfimMessage] = useState("");
  const [updatedYear, setUpdatedYear] = useState("");

  function onStatusSave(status: Status, statusInfo?: StatusInfo) {
    updateNadeStatus(nade.id, { status, statusInfo });
    onDismiss();
  }

  function onDelete() {
    if (deleteConfimMessage === "DELETE") {
      deleteNade(nade.id);
    }
  }

  function onUpdateYear() {
    forceNadeYear(nade.id, updatedYear);
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
      <ForceUserSettings onClose={onDismiss} nadeId={nade.id} />
      <h3>Force Year</h3>
      <Input
        value={updatedYear}
        onChange={(_, text) => setUpdatedYear(text.value)}
      />
      <Button onClick={onUpdateYear}>UPDATE YEAR</Button>
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
