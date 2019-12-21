import { FC } from "react";
import { CsgoMap } from "../../../models/Nade";
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

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          value={map}
          onChange={onChange}
          options={[
            { key: "notset", text: "Select..", value: "notset" },
            { key: "dust2", text: "Dust2", value: "dust2" },
            { key: "mirage", text: "Mirage", value: "mirage" }
          ]}
        />
      )}
      {!isEditing && <span>{capitalize(map || "")}</span>}
    </>
  );
};
