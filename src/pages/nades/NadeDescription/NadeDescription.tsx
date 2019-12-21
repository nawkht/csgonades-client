import { Colors } from "../../../../constants/colors";
import { FC, useState } from "react";
import { Nade } from "../../../models/Nade";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { Icon } from "semantic-ui-react";
import { NadeDescriptionEditor } from "./NadeDescriptionEditor";
import { updateNadeAction } from "../../../store/NadeStore/NadeActions";
import { useReduxDispatch } from "../../../store/StoreUtils/ThunkActionType";

type Props = {
  nade: Nade;
};

export const NadeDescription: FC<Props> = ({ nade }) => {
  const dispatch = useReduxDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(nade.description || "");

  function onCancelEdit() {
    setIsEditing(false);
  }

  function onSaveEdit(description: string) {
    setDescription(description);
    updateNadeAction(dispatch, nade.id, { description });
    setIsEditing(false);
  }

  return (
    <>
      <div className="nade-desc-wrapper">
        {!isEditing && (
          <div
            className="nade-desc-edit-wrapper"
            onClick={() => setIsEditing(true)}
          >
            <Icon link={true} name="edit" />
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
          border: 1px solid ${Colors.PRIMARY_BORDER};
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        .nade-desc-body {
          padding: 12px 18px;
        }

        .nade-desc-edit-wrapper {
          position: absolute;
          top: 12px;
          right: 18px;
        }
      `}</style>
    </>
  );
};
