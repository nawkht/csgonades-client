import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {};

export const ThrownFromInput: FC<Props> = ({}) => {
  return (
    <>
      <CsgnInput
        required
        label="Thrown from"
        placeholder="Example: T Spawn"
        onChange={() => {
          // no-op
        }}
      />
    </>
  );
};
