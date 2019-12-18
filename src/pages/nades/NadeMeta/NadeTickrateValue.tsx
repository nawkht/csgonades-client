import { FC } from "react";
import {
  Tickrate,
  nadeTickrateOptions,
  tickrateString
} from "../../../models/Nade";
import { Dropdown, DropdownProps } from "semantic-ui-react";

type Props = {
  tickrate: Tickrate;
  isEditing: boolean;
  onChange: (tickrate: Tickrate) => void;
};

export const NadeTickrateValue: FC<Props> = ({
  isEditing,
  tickrate,
  onChange
}) => {
  const options = nadeTickrateOptions();

  function onDropdownChange(_: any, data: DropdownProps) {
    const newTickrate = data.value as Tickrate;
    onChange(newTickrate);
  }

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          value={tickrate}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{tickrateString(tickrate)}</span>}
    </>
  );
};
