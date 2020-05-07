import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {};

export const EndPosInput: FC<Props> = ({}) => {
  return (
    <>
      <CsgnInput
        required
        label="Nade end location"
        placeholder="Example: XBox"
        onChange={() => {
          // no-op
        }}
      />
    </>
  );
};
