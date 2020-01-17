import { FC } from "react";
import { Nade } from "../../../models/Nade/Nade";
import { CSGNModal } from "../../../ui-common/CSGNModal";
import { AdminNadeSettings } from "./AdminNadeSettings";

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
