import { FC, useState } from "react";
import { Nade } from "../../../models/Nade/Nade";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDescriptionEditor } from "./NadeDescriptionEditor";
import { useUpdateNadeAction } from "../../../store/NadeStore/NadeActions";
import { EditButton } from "../../../ui-common/EditButton";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeDescription: FC<Props> = ({ nade, allowEdit }) => {
  const { colors, durations } = useTheme();
  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(nade.description || "");

  function onCancelEdit() {
    setIsEditing(false);
  }

  function onSaveEdit(description: string) {
    setDescription(description);
    updateNade(nade.id, { description });
    setIsEditing(false);
  }

  return (
    <>
      <div className="nade-desc-wrapper">
        {allowEdit && (
          <div className="edit-button">
            <EditButton
              isEditing={isEditing}
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}

        <div className="nade-desc-body">
          {!isEditing && <NadeDescriptionDisplay value={description} />}
          {isEditing && (
            <NadeDescriptionEditor
              onCancel={onCancelEdit}
              onSave={onSaveEdit}
              description={description}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .nade-desc-wrapper {
          position: relative;
          background: white;
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .nade-desc-wrapper:hover .edit-button {
          opacity: 1;
        }

        .nade-desc-body {
          padding: 12px 18px;
        }

        .edit-button {
          position: absolute;
          top: calc(100%);
          left: 0;
          opacity: 0;
          transition: opacity 0 ${durations}s;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
};
