import { Nade, Status, StatusInfo } from "../../../models/Nade/Nade";
import { FC, useState } from "react";
import { StatusEditor } from "./StatusEditor";
import { ForceUserSettings } from "./ForceUserSettings";
import {
  useDeleteNade,
  useUpdateNade,
  useUpdateNadeStatus
} from "../../../store/NadeStore/NadeHooks";
import { Input, Button } from "semantic-ui-react";
import ReactDatePicker from "react-datepicker";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade, onDismiss }) => {
  const updateNadeStatus = useUpdateNadeStatus();
  const updateNade = useUpdateNade();
  const deleteNade = useDeleteNade();
  const [deleteConfimMessage, setDeleteConfimMessage] = useState("");
  const [createdAt, setCreatedAt] = useState<Date | null>(
    new Date(nade.createdAt)
  );

  function onStatusSave(status: Status, statusInfo?: StatusInfo) {
    updateNadeStatus(nade.id, { status, statusInfo });
    onDismiss();
  }

  function onDelete() {
    if (deleteConfimMessage === "DELETE") {
      deleteNade(nade.id);
    }
  }

  function onUpdateCreatedAt() {
    if (createdAt) {
      updateNade(nade.id, { createdAt: createdAt });
    }

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
      <h3>Force Date</h3>
      <ReactDatePicker
        selected={createdAt}
        showYearDropdown
        showMonthDropdown
        onChange={newDate => setCreatedAt(newDate)}
      />
      <br />
      <Button onClick={onUpdateCreatedAt}>UPDATE YEAR</Button>
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
