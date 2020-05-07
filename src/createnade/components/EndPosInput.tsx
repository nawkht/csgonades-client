import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {
  onChange: (value: string) => void;
};

export const EndPosInput: FC<Props> = ({ onChange }) => {
  return (
    <>
      <CsgnInput
        label="Nade end location"
        placeholder="Example: XBox"
        onChange={onChange}
      />
    </>
  );
};
