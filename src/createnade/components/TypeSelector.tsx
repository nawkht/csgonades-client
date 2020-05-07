import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { nadeTypeOptions, NadeType } from "../../models/Nade/NadeType";

type Props = {
  onChange: (nadeType: NadeType) => void;
};

export const TypeSelector: FC<Props> = ({ onChange }) => {
  return (
    <>
      <MiniLabel value="Type" />
      <CsGnDropdown options={nadeTypeOptions()} onChange={onChange} />
    </>
  );
};
