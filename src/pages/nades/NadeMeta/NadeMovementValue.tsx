import { FC } from "react";
import { Movement, nadeMovementOptions } from "../../../models/Nade";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { capitalize } from "../../../utils/Common";

type Props = {
  movement: Movement;
  isEditing: boolean;
  onChange: (movement: Movement) => void;
};

export const NadeMovementValue: FC<Props> = ({
  isEditing,
  movement,
  onChange
}) => {
  const options = nadeMovementOptions();

  function onDropdownChange(_: any, data: DropdownProps) {
    const movement = data.value as Movement;
    onChange(movement);
  }

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          value={movement}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{capitalize(movement)}</span>}
    </>
  );
};
