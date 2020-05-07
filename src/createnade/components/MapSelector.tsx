import { FC } from "react";
import { CsGnDropdown } from "./CsGnDropdown";
import { MiniLabel } from "./MiniLabel";
import { CsgoMap, nadeMapOptions } from "../../models/Nade/CsGoMap";

type Props = {};

export const MapSelector: FC<Props> = ({}) => {
  return (
    <>
      <MiniLabel value="Map" />
      <CsGnDropdown<CsgoMap>
        options={nadeMapOptions()}
        onChange={() => {
          //no-op
        }}
      />
      <style jsx>{``}</style>
    </>
  );
};
