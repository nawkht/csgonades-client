import { FC } from "react";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { MapPositionSelector } from "./MapPositionSelector";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { MapCoordinates } from "../../../models/Nade/Nade";

type Props = {
  map: CsgoMap;
};

export const MapPositionModal: FC<Props> = ({ map }) => {
  const {
    postionModalOpen,
    toggleMapPositionModal,
    filterByMapCoords
  } = useNadeFilter();

  const onSelect = (coords: MapCoordinates) => {
    toggleMapPositionModal();
    filterByMapCoords(coords);
  };

  return (
    <>
      {postionModalOpen && (
        <MapPositionSelector
          map={map}
          onClick={onSelect}
          onDismiss={toggleMapPositionModal}
        />
      )}
    </>
  );
};
