import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Technique, nadeTechniqueOptions } from "../../models/Nade/Technique";

type Props = {
  defaultValue?: Technique;
  onChange: (tech: Technique) => void;
};

export const TechniqueSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Technique" />
      <CsGnDropdown<Technique>
        defaultValue={defaultValue}
        options={nadeTechniqueOptions()}
        onChange={onChange}
      />
    </>
  );
};
