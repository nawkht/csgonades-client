import { FC } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import {
  Technique,
  nadeTechniqueOptions,
  techniqueString
} from "../../../models/Technique";

type Props = {
  technique?: Technique;
  isEditing: boolean;
  onChange: (technique?: Technique) => void;
};

export const NadeTechniqueValue: FC<Props> = ({
  isEditing,
  technique,
  onChange
}) => {
  const options = nadeTechniqueOptions();

  function onDropdownChange(_: any, data: DropdownProps) {
    const newTechnique = data.value as Technique;
    onChange(newTechnique);
  }

  const techniqueText = technique
    ? techniqueString(technique)
    : "Not selected...";

  console.log("#", technique, techniqueText);

  return (
    <>
      {isEditing && (
        <Dropdown
          placeholder="Select..."
          inline
          value={technique}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{techniqueText}</span>}
    </>
  );
};