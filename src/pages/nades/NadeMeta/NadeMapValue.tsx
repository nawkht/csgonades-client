import { FC } from "react";
import { CsgoMap, nadeMapOptions } from "../../../models/Nade";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { capitalize } from "../../../utils/Common";

type Props = {
  map?: CsgoMap;
  isEditing: boolean;
  onMapChange: (map: CsgoMap) => void;
};

export const NadeMapValue: FC<Props> = ({ isEditing, map, onMapChange }) => {
  function onChange(_: any, data: DropdownProps) {
    const newMap = data.value as CsgoMap;
    onMapChange(newMap);
  }

  const mapText = map ? capitalize(map) : "Not selected...";

  const options = [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 }
  ];

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          placeholder="Select..."
          value={map}
          onChange={onChange}
          options={nadeMapOptions()}
        />
      )}
      {!isEditing && <span>{mapText}</span>}
    </>
  );
};
