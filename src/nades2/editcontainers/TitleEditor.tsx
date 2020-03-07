import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { CSGNModal } from "../../common/CSGNModal";
import { useUpdateNade } from "../../store/NadeStore/NadeHooks";

type Props = {
  nadeId: string;
  title: string;
  visisble: boolean;
  onClose: () => void;
};

export const TitleEditor: FC<Props> = ({
  visisble,
  onClose,
  title,
  nadeId,
}) => {
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
          <input
            className="nade-edit-input"
            value={nadeTitle}
            onChange={e => setNadeTitle(e.target.value)}
            placeholder="Add a title.."
          />

          <div className="nade-edit-container">
            <span onClick={onClose}>
              <Icon circular link color="grey" name="cancel" />
            </span>
            <span onClick={onSave}>
              <Icon inverted circular link color="olive" name="check" />
            </span>
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .nade-edit-input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          outline: none;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};
