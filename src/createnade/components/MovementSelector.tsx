import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Movement, nadeMovementOptions } from "../../models/Nade/NadeMovement";

type Props = {};

export const MovementSelector: FC<Props> = ({}) => {
  return (
    <>
      <MiniLabel value="Movement" />
      <CsGnDropdown<Movement>
        options={nadeMovementOptions()}
        onChange={() => {
          //no-op
        }}
      />
    </>
  );
};
