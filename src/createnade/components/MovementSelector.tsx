import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Movement, nadeMovementOptions } from "../../models/Nade/NadeMovement";

type Props = {
  onChange: (movement: Movement) => void;
};

export const MovementSelector: FC<Props> = ({ onChange }) => {
  return (
    <>
      <MiniLabel value="Movement" />
      <CsGnDropdown<Movement>
        options={nadeMovementOptions()}
        onChange={onChange}
      />
    </>
  );
};
