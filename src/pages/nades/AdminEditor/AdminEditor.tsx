import { Button } from "semantic-ui-react";
import { useIsAdminOrModerator } from "../../../store/AuthStore/AuthHooks";
import { AdminEditorModal } from "./AdminEditorModal";
import { useState, FC } from "react";
import { Nade } from "../../../models/Nade";

type Props = {
  nade: Nade;
};

export const AdminEditor: FC<Props> = ({ nade }) => {
  const isVisible = useIsAdminOrModerator();
  const [isEditing, setIsEditing] = useState(false);

  if (!isVisible) {
    return null;
  }

  function dismissModal() {
    setIsEditing(false);
  }

  function showModal() {
    setIsEditing(true);
  }

  return (
    <>
      <div>
        <Button onClick={showModal}>Admin Edits</Button>
        <AdminEditorModal
          nade={nade}
          visible={isEditing}
          onDismiss={dismissModal}
        />
      </div>
    </>
  );
};
