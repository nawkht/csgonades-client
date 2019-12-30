import { useState, FC, useEffect, useMemo, useRef } from "react";
import { GfycatEditor } from "./GfycatEditor";
import { NadeApi } from "../api/NadeApi";
import { GfycatVideoPlayer } from "./GfycatVideoPlayer";
import { Nade } from "../models/Nade/Nade";
import { useUpdateNadeAction } from "../store/NadeStore/NadeActions";
import { EditButton } from "./EditButton";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { useKeepAspectRatio } from "../utils/CommonHooks";
import useComponentSize from "@rehooks/component-size";
import { GfycatLargePlayer } from "./GfycatLargePlayer";

export type Aspect = "16:9" | "16:10";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const GfycatPlayerContrainer: FC<Props> = ({ nade, allowEdit }) => {
  const { colors, durations } = useTheme();

  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  const [highDef, setHighDef] = useState(true);

  const videoUrl = useMemo(() => {
    if (highDef) {
      return nade.gfycat.largeVideoUrl;
    } else {
      return nade.gfycat.smallVideoUrl;
    }
  }, [highDef]);

  function toggleQuality() {
    setHighDef(!highDef);
  }

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

        <GfycatLargePlayer gfyUrl={videoUrl} />
        {isEditing && <GfycatEditor nade={nade} onCancel={onCancelEdit} />}

        <div className="quality-toggle" onClick={toggleQuality}>
          <div className="quality">{highDef ? "HD" : "SD"}</div>
        </div>
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

        .gfycat-container:hover .quality-toggle {
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

        .quality-toggle {
          position: absolute;
          top: 12px;
          left: 12px;
          opacity: 0;
        }

        .quality {
          padding: 3px 6px 3px 3px;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8em;
          background: ${colors.PRIMARY_75_PERCENT};
          color: white;
          z-index: 999;
          transition: background ${durations.transition}s;
          display: flex;
          align-content: center;
        }
      `}</style>
    </>
  );
};
