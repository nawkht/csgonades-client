import { FC, useState } from "react";
import { Button } from "semantic-ui-react";
import { Nade } from "../../../models/Nade/Nade";
import { useIsAdminOrModerator } from "../../../store/AuthStore/AuthHooks";
import { AdminEditorModal } from "./AdminEditorModal";

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
      <div className="admin-editor">
        <Button fluid onClick={showModal}>
          MODERATOR EDIT
        </Button>
        <AdminEditorModal
          nade={nade}
          visible={isEditing}
          onDismiss={dismissModal}
        />
      </div>
      <style jsx>{`
        .admin-editor {
          margin-top: 36px;
        }
      `}</style>
    </>
  );
};
