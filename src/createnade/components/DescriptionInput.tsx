import { FC } from "react";
import { CsgnTextArea } from "../../common/inputs/CsgnTextArea";

type Props = {
  onChange: (value: string) => void;
};

export const DescriptionInput: FC<Props> = ({ onChange }) => {
  return (
    <>
      <CsgnTextArea
        placeholder="Write how to perform the throw."
        label="Description"
        onChange={onChange}
      />
    </>
  );
};
