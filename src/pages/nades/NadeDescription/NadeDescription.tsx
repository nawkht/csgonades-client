import { FC, useState } from "react";
import { Nade } from "../../../models/Nade/Nade";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { useUpdateNade } from "../../../store/NadeStore/NadeHooks";
import { EditButton } from "../../../ui-common/EditButton";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDescriptionEditor } from "./NadeDescriptionEditor";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeDescription: FC<Props> = ({ nade, allowEdit }) => {
  const { colors, durations, uiDimensions } = useTheme();
  const updateNade = useUpdateNade();
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

        {!isEditing && (
          <div className="nade-desc-body">
            <NadeDescriptionDisplay value={description} />
          </div>
        )}

        {isEditing && (
          <NadeDescriptionEditor
            onCancel={onCancelEdit}
            onSave={onSaveEdit}
            description={description}
          />
        )}
      </div>
      <style jsx>{`
        .nade-desc-wrapper {
          position: relative;
          background: white;
          border-left: 1px solid ${colors.PRIMARY_BORDER};
          border-right: 1px solid ${colors.PRIMARY_BORDER};
        }

        .nade-desc-wrapper:hover .edit-button {
          opacity: 1;
        }

        .nade-desc-body {
          padding: ${uiDimensions.PADDING_LARGE}px;
        }

        .edit-button {
          position: absolute;
          top: calc(100%);
          left: ${uiDimensions.PADDING_LARGE}px;
          opacity: 0;
          transition: opacity 0 ${durations}s;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
};
