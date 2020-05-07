import { FC } from "react";
import { CsGnDropdown } from "./CsGnDropdown";
import { MiniLabel } from "./MiniLabel";
import { CsgoMap, nadeMapOptions } from "../../models/Nade/CsGoMap";

type Props = {
  onChange: (value: CsgoMap) => void;
};

export const MapSelector: FC<Props> = ({ onChange }) => {
  return (
    <>
      <MiniLabel value="Map" />
      <CsGnDropdown<CsgoMap> options={nadeMapOptions()} onChange={onChange} />
      <style jsx>{``}</style>
    </>
  );
};
