import { FC, useState } from "react";
import { CsgnSaveButton } from "../../common/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../common/inputs/CsgnTextArea";

type Props = {
  onSave: (description: string) => void;
  onCancel: () => void;
  description: string;
};

export const NadeDescriptionEditor: FC<Props> = ({ description, onSave }) => {
  const [descValue, setDescValue] = useState(description);

  function onSaveDescription() {
    onSave(descValue);
  }

  return (
    <>
      <div className="desc-editor">
        <CsgnTextArea
          label="Description"
          onChange={setDescValue}
          value={descValue}
        />

        <CsgnSaveButton onClick={onSaveDescription} />
      </div>
      <style jsx>{`
        .desc-editor {
          width: 50vw;
        }
      `}</style>
    </>
  );
};
