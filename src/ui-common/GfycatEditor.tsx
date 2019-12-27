import { FC, useState, ChangeEvent } from "react";

type Props = {
  gfyID?: string;
  onSave: (gfyID: string) => void;
  onCancel: () => void;
};

export const GfycatEditor: FC<Props> = ({ gfyID, onSave, onCancel }) => {
  const [currentGfyID, updateGfyID] = useState(gfyID || "");

  function onGfyIDChange(event: ChangeEvent<HTMLInputElement>) {
    updateGfyID(event.target.value);
  }

  function saveGfycat() {
    onSave(currentGfyID);
  }

  return (
    <>
      <div className="gfycat-editor">
        <div className="gfycat-editor-fields">
          <input
            className="gfycat-editor-input"
            value={currentGfyID}
            onChange={onGfyIDChange}
          />
          <div className="gfycat-editor-buttons">
            <button className="gfycat-editor-cancel" onClick={onCancel}>
              CANCEL
            </button>
            <button className="gfycat-editor-save" onClick={saveGfycat}>
              SAVE
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .gfycat-editor {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
        }

        .gfycat-editor-fields {
          background: white;
          align-self: center;
        }

        .gfycat-editor-buttons {
          display: flex;
        }

        .gfycat-editor-buttons button {
          flex: 1;
          border: none;
          outline: none;
          padding: 6px;
        }

        .gfycat-editor-input {
          border: 1px solid #e3e3e3;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          padding: 6px;
          outline: none;
          min-width: 200px;
        }

        .gfycat-editor-cancel {
          border-bottom-left-radius: 3px;
          background: #e3e3e3;
        }

        .gfycat-editor-save {
          border-bottom-right-radius: 3px;
          background: #34baeb;
        }
      `}</style>
    </>
  );
};
