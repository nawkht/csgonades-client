import { FC } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import {
  nadeTickrateOptions,
  Tickrate,
  tickrateString
} from "../../../models/Nade/NadeTickrate";

type Props = {
  tickrate?: Tickrate;
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

  const tickrateText = tickrate ? tickrateString(tickrate) : "Not selected...";

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          placeholder="Select..."
          value={tickrate}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{tickrateText}</span>}
    </>
  );
};
