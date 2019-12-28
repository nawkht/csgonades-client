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
