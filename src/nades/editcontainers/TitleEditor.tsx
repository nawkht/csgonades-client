import { FC, useState } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { useUpdateNade } from "../../store/NadeStore/hooks/useUpdateNade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nadeId: string;
  title: string;
  visisble: boolean;
  onClose: () => void;
};

const TitleEditor: FC<Props> = ({ visisble, onClose, title, nadeId }) => {
  const { colors } = useTheme();
  const [nadeTitle, setNadeTitle] = useState(title || "");
  const updateNade = useUpdateNade();

  function onSave() {
    updateNade(nadeId, { title: nadeTitle });
    onClose();
  }

  return (
    <>
      <CSGNModal title="Edit title" visible={visisble} onDismiss={onClose}>
        <div className="title-edit-container">
          <div className="title-label">Title</div>
          <input
            className="nade-edit-input"
            value={nadeTitle}
            onChange={e => setNadeTitle(e.target.value)}
            placeholder="Add a title.."
          />

          <button className="submit-btn" onClick={onSave}>
            Save
          </button>
        </div>
      </CSGNModal>
      <style jsx>{`
        .title-edit-container {
          min-width: 40vw;
        }

        .title-label {
          margin-bottom: 5px;
        }

        .nade-edit-input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          outline: none;
          margin-bottom: 10px;
          border-radius: 5px;
          border: 1px solid ${colors.BORDER};
        }

        .submit-btn {
          border: none;
          background: ${colors.PRIMARY};
          color: white;
          margin-top: 15px;
          padding: 10px 20px;
          border-radius: 5px;
          width: 200px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default TitleEditor;
