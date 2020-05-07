import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { nadeTypeOptions } from "../../models/Nade/NadeType";

type Props = {};

export const TypeSelector: FC<Props> = ({}) => {
  return (
    <>
      <MiniLabel value="Type" />
      <CsGnDropdown
        options={nadeTypeOptions()}
        onChange={() => {
          //no-op
        }}
      />
      <style jsx>{``}</style>
    </>
  );
};
