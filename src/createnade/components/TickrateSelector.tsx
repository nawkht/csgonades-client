import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { CsGnDropdown } from "./CsGnDropdown";
import { Tickrate, nadeTickrateOptions } from "../../models/Nade/NadeTickrate";

type Props = {
  defaultValue?: Tickrate;
  onChange: (tech: Tickrate) => void;
};

export const TickrateSelector: FC<Props> = ({ onChange, defaultValue }) => {
  return (
    <>
      <MiniLabel value="Tickrate" />

      <CsGnDropdown<Tickrate>
        defaultValue={defaultValue}
        options={nadeTickrateOptions()}
        onChange={onChange}
      />
      <em>Jumpthrow bind, please specify tickrate.</em>

      <style jsx>{`
        em {
          margin-top: 5px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};
