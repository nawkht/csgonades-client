import { FC } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { capitalize } from "../../../utils/Common";
import {
  Movement,
  nadeMovementOptions
} from "../../../models/Nade/NadeMovement";

type Props = {
  movement?: Movement;
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

  const movementText = movement ? capitalize(movement) : "Not selected...";

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          placeholder="Select..."
          value={movement}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{movementText}</span>}
    </>
  );
};
