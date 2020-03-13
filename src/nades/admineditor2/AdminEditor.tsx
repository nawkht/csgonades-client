import { FC, useState } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import { AdminEditorModal } from "./AdminEditorModal";

type Props = {
  nade: Nade;
};

const AdminEditor: FC<Props> = ({ nade }) => {
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

  console.log("Rendered admin editor");

  return (
    <>
      <div className="admin-editor">
        <button onClick={showModal}>Admin</button>
      </div>
      <AdminEditorModal
        nade={nade}
        visible={isEditing}
        onDismiss={dismissModal}
      />
      <style jsx>{`
        .admin-editor {
          max-width: 150px;
          margin: 0 auto;
          padding-bottom: 100px;
        }
      `}</style>
    </>
  );
};

export default AdminEditor;
