import { FC, ChangeEvent } from "react";

type Props = {
  description: string;
  onDescriptionChange: (description: string) => void;
};

export const NadeDescriptionTextArea: FC<Props> = ({
  description,
  onDescriptionChange
}) => {
  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onDescriptionChange(e.target.value);
  }

  return (
    <>
      <textarea
        onChange={onChange}
        value={description}
        placeholder="Nade description..."
      />
      <style jsx>{`
        textarea {
          width: 100%;
          resize: none;
          outline: none;
          min-height: 200px;
        }
      `}</style>
    </>
  );
};
