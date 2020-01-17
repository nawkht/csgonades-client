import { FC } from "react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { MapCoordinates } from "../../../models/Nade/Nade";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { MapPositionSelector } from "./MapPositionSelector";

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
    toggleMapPositionModal(false);
    filterByMapCoords(coords);
  };

  const onDismiss = () => {
    toggleMapPositionModal(false);
  };

  return (
    <>
      {postionModalOpen && (
        <MapPositionSelector
          map={map}
          onClick={onSelect}
          onDismiss={onDismiss}
        />
      )}
    </>
  );
};
