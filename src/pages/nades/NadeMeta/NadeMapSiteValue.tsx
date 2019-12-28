import { FC } from "react";
import { MapSite, nadeMapSiteOptions } from "../../../models/Nade";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { capitalize } from "../../../utils/Common";

type Props = {
  mapSite?: MapSite;
  isEditing: boolean;
  onChange: (mapSite: MapSite) => void;
};

export const NadeMapSiteValue: FC<Props> = ({
  isEditing,
  mapSite,
  onChange
}) => {
  const options = nadeMapSiteOptions();

  function onDropdownChange(_: any, data: DropdownProps) {
    const mapSite = data.value as MapSite;
    onChange(mapSite);
  }

  const mapSiteText = mapSite ? capitalize(mapSite) : "Not selected...";

  return (
    <>
      {isEditing && (
        <Dropdown
          inline
          placeholder="Select..."
          value={mapSite}
          onChange={onDropdownChange}
          options={options}
        />
      )}
      {!isEditing && <span>{mapSiteText}</span>}
    </>
  );
};
