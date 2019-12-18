import { useState, FC, useEffect } from "react";
import { GfycatEditor } from "./GfycatEditor";
import { NadeApi } from "../api/NadeApi";
import { GfycatVideoPlayer } from "./GfycatVideoPlayer";
import { GfycatData } from "../models/Nade";
import { Colors } from "../../constants/colors";

export type Aspect = "16:9" | "16:10";

type Props = {
  gfyData?: GfycatData;
  onSave?: (gfyID: string) => void;
  disableEdit?: boolean;
};

export const GfycatPlayerContrainer: FC<Props> = ({
  onSave,
  gfyData,
  disableEdit
}) => {
  const [isEditing] = useState(false);
  useEffect(() => {
    if (gfyData) {
      NadeApi.registerView(gfyData.gfyId);
    }
  }, []);

  return (
    <>
      <div className="gfycat-container">
        <GfycatVideoPlayer gfyData={gfyData} />
        {isEditing && !disableEdit && !!onSave && !!gfyData && (
          <GfycatEditor gfyID={gfyData.gfyId} onSave={onSave} />
        )}
      </div>
      <style jsx>{`
        .gfycat-container {
          background: white;
          position: relative;
          border: 1px solid ${Colors.PRIMARY_BORDER};
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border-bottom: none;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
