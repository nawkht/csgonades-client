import { FC } from "react";
import { CsgnTextArea } from "../../common/inputs/CsgnTextArea";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const DescriptionInput: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <CsgnTextArea
        defaultValue={defaultValue}
        placeholder="Write how to perform the throw."
        label="Description"
        onChange={onChange}
      />
    </>
  );
};
