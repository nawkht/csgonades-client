import { FC, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { CsgnInput } from "../../common/inputs/CsgnInput";
import { Nade, Status, StatusInfo } from "../../models/Nade/Nade";
import { useDeleteNade } from "../../store/NadeStore/hooks/useDeleteNade";
import { useUpdateNadeStatus } from "../../store/NadeStore/hooks/useUpdateNadeStatus";
import { ForceUserSettings } from "./ForceUserSettings";
import { StatusEditor } from "./StatusEditor";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade, onDismiss }) => {
  const updateNadeStatus = useUpdateNadeStatus();
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

  return (
    <>
      <div className="admin-nade-setting">
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
          onChange={(newDate) => setCreatedAt(newDate)}
        />
        <br />
        <h3>Delete</h3>
        <CsgnInput
          label={`Write "DELETE"`}
          initialValue={deleteConfimMessage}
          onChange={setDeleteConfimMessage}
        />
        <button onClick={onDelete}>Delete</button>
      </div>
      <style jsx>{`
        .admin-nade-setting {
          width: 50vw;
        }
      `}</style>
    </>
  );
};
