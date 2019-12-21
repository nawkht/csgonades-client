import { Nade } from "../../../models/Nade";
import { FC } from "react";
import { StatusEditor } from "./StatusEditor";
import { ForceUserSettings } from "./ForceUserSettings";

type Props = {
  nade: Nade;
  onDismiss: () => void;
};

export const AdminNadeSettings: FC<Props> = ({ nade }) => {
  function onStatusSave() {}

  return (
    <div>
      <h3>Nade Status</h3>
      <StatusEditor
        status={nade.status}
        statusInfo={nade.statusInfo}
        onSave={onStatusSave}
      />
      <h3>Force User</h3>
      <ForceUserSettings />
      <h3>Force Stats</h3>
    </div>
  );
};
