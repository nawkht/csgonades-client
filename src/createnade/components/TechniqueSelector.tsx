import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Technique, nadeTechniqueOptions } from "../../models/Nade/Technique";

type Props = {};

export const TechniqueSelector: FC<Props> = ({}) => {
  return (
    <>
      <MiniLabel value="Technique" />
      <CsGnDropdown<Technique>
        options={nadeTechniqueOptions()}
        onChange={() => {
          //no-op
        }}
      />
    </>
  );
};
