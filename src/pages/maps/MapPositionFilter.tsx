import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { MapPositionSelector } from "./MapPositionSelector";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { MapCoordinates } from "../../models/Nade/Nade";
import { useFilterByCoords } from "../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
};

export const MapPositionFilter: FC<Props> = ({ map }) => {
  const { filterByMapCoords } = useFilterByCoords();
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (coords: MapCoordinates) => {
    setIsOpen(false);
    filterByMapCoords(coords);
  };

  return (
    <>
      <div className="position-filter" onClick={() => setIsOpen(true)}>
        <span>POSITION</span>
        <Icon name="location arrow" />
      </div>
      {isOpen && (
        <MapPositionSelector
          map={map}
          onClick={onSelect}
          onDismiss={() => setIsOpen(false)}
        />
      )}
      <style jsx>{`
        .position-filter {
          padding: 12px;
          cursor: pointer;
        }
        .position-filter span {
          margin-right: 6px;
        }
      `}</style>
    </>
  );
};
