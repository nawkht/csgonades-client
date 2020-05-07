import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Technique, nadeTechniqueOptions } from "../../models/Nade/Technique";

type Props = {
  onChange: (tech: Technique) => void;
};

export const TechniqueSelector: FC<Props> = ({ onChange }) => {
  return (
    <>
      <MiniLabel value="Technique" />
      <CsGnDropdown<Technique>
        options={nadeTechniqueOptions()}
        onChange={onChange}
      />
    </>
  );
};
