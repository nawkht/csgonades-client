import { useState, FC } from "react";
import { GfyCatPlayer } from "./GfycatPlayer";
import { GfycatEditor } from "./GfycatEditor";

export type Aspect = "16:9" | "16:10";

type Props = {
  gfyID?: string;
  onSave?: (gfyID: string) => void;
  disableEdit?: boolean;
  aspect?: Aspect;
};

export const GfycatPlayerContrainer: FC<Props> = ({
  onSave,
  gfyID,
  disableEdit,
  aspect
}) => {
  const [isEditing] = useState(true);

  return (
    <>
      <div className="gfycat-container">
        <GfyCatPlayer gfycatID={gfyID} aspect={aspect} />
        {isEditing && !disableEdit && !!onSave && (
          <GfycatEditor gfyID={gfyID} onSave={onSave} />
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
