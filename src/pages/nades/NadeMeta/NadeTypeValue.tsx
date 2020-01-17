import { FC } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import {
  NadeType,
  nadeTypeOptions,
  nadeTypeString
} from "../../../models/Nade/NadeType";

type Props = {
  nadeType?: NadeType;
  isEditing: boolean;
  onNadeTypeChange: (nadeType: NadeType) => void;
};

export const NadeTypeValue: FC<Props> = ({
  isEditing,
  nadeType,
  onNadeTypeChange
}) => {
  function onChange(_: any, data: DropdownProps) {
    const newNadeType = data.value as NadeType;
    onNadeTypeChange(newNadeType);
  }

  const nadeTypeText = nadeType ? nadeTypeString(nadeType) : "Not selected...";

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          placeholder="Select..."
          value={nadeType}
          onChange={onChange}
          options={nadeTypeOptions()}
        />
      )}
      {!isEditing && <span>{nadeTypeText}</span>}
    </>
  );
};
