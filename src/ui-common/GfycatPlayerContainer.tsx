import { useState, FC, useEffect } from "react";
import { GfycatEditor } from "./GfycatEditor";
import { NadeApi } from "../api/NadeApi";
import { GfycatVideoPlayer } from "./GfycatVideoPlayer";
import { Nade } from "../models/Nade";
import { useUpdateNadeAction } from "../store/NadeStore/NadeActions";
import { EditButton } from "./EditButton";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

export type Aspect = "16:9" | "16:10";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const GfycatPlayerContrainer: FC<Props> = ({ nade, allowEdit }) => {
  const { colors, durations } = useTheme();

  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (nade.gfycat) {
      NadeApi.registerView(nade.gfycat.gfyId);
    }
  }, []);

  function onEditClick() {
    setIsEditing(true);
  }

  function onCancelEdit() {
    setIsEditing(false);
  }

  function onSaveGfycat(newGfyId: string) {
    updateNade(nade.id, {
      gfycatIdOrUrl: newGfyId
    });
  }

  return (
    <>
      <div className="gfycat-container">
        {!isEditing && allowEdit && (
          <div className="edit-button">
            <EditButton isEditing={isEditing} onClick={onEditClick} />
          </div>
        )}

        <GfycatVideoPlayer gfyData={nade.gfycat} />
        {isEditing && <GfycatEditor nade={nade} onCancel={onCancelEdit} />}
      </div>
      <style jsx>{`
        .gfycat-container {
          background: white;
          position: relative;
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border-bottom: none;
          overflow: hidden;
        }

        .gfycat-container:hover .edit-button {
          opacity: 1;
        }

        .edit-button {
          position: absolute;
          top: 12px;
          right: 12px;
          opacity: 0;
          transition: opacity ${durations.transition}s;
          z-index: 998;
        }
      `}</style>
    </>
  );
};
