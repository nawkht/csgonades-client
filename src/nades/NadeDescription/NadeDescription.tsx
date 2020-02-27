import { FC, useState } from "react";
import { EditButton } from "../../common/EditButton";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { Nade } from "../../models/Nade/Nade";
import { useUpdateNade } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDescriptionEditor } from "./NadeDescriptionEditor";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeDescription: FC<Props> = ({ nade, allowEdit }) => {
  const { colors } = useTheme();
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
          background: ${colors.DP01};
          border-left: 1px solid ${colors.BORDER};
          border-right: 1px solid ${colors.BORDER};
        }

        .nade-desc-wrapper:hover .edit-button {
          opacity: 1;
        }

        .nade-desc-body {
          padding: ${Dimensions.PADDING_LARGE};
          color: ${colors.TEXT};
        }

        .edit-button {
          position: absolute;
          top: calc(100%);
          left: ${Dimensions.PADDING_LARGE};
          opacity: 0;
          transition: opacity ${AnimationTimings.fast};
          padding-top: 6px;
        }
      `}</style>
    </>
  );
};
