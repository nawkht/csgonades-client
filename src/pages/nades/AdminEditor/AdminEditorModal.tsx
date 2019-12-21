import { FC } from "react";
import { CSGNModal } from "../../../ui-common/CSGNModal";
import { AdminNadeSettings } from "./AdminNadeSettings";
import { Nade } from "../../../models/Nade";

type Props = {
  visible: boolean;
  nade: Nade;
  onDismiss: () => void;
};

export const AdminEditorModal: FC<Props> = ({ nade, visible, onDismiss }) => {
  return (
    <CSGNModal title="Admin Editor" visible={visible} onDismiss={onDismiss}>
      <AdminNadeSettings nade={nade} onDismiss={onDismiss} />
    </CSGNModal>
  );
};
