import { FC } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { Nade } from "../../models/Nade/Nade";
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
