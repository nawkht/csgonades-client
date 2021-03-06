import { FC } from "react";
import { CsGnDropdown } from "./CsGnDropdown";
import { MiniLabel } from "./MiniLabel";
import { CsgoMap, nadeMapOptions } from "../../models/Nade/CsGoMap";

type Props = {
  defaultValue?: CsgoMap;
  onChange: (value: CsgoMap) => void;
};

export const MapSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Map" />
      <CsGnDropdown<CsgoMap>
        defaultValue={defaultValue}
        options={nadeMapOptions()}
        onChange={onChange}
      />
      <style jsx>{``}</style>
    </>
  );
};
