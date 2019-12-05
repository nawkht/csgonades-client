import { useState, FC, useEffect } from "react";
import { GfycatEditor } from "./GfycatEditor";
import { NadeApi } from "../../api/NadeApi";
import { GfycatVideoPlayer } from "./GfycatVideoPlayer";
import { GfycatData } from "../../models/Nade";

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
  });

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
        }
      `}</style>
    </>
  );
};
