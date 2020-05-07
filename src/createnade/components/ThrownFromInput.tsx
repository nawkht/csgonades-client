import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {
  onChange: (value: string) => void;
};

export const ThrownFromInput: FC<Props> = ({ onChange }) => {
  return (
    <>
      <CsgnInput
        label="Thrown from"
        placeholder="Example: T Spawn"
        onChange={onChange}
      />
    </>
  );
};
