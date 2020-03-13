import { FC, useRef, useState } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useFilterByCoords } from "../../store2/FilterStore/hooks/useFilterByCoords";
import { useNadesForMapView } from "../../store2/FilterStore/hooks/useNadesForMapView";
import { useToggleMapview } from "../../store2/FilterStore/hooks/useToggleMapview";
import { MapPosIcon } from "./MapPosIcon";

type Props = {
  map: CsgoMap;
};

export const MapView: FC<Props> = ({ map }) => {
  const { mapViewVisisble, toggleMapViewVisibility } = useToggleMapview();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadesForMapView();
  const filterByCoords = useFilterByCoords();
  const mapViewRef = useRef<HTMLDivElement>(null);

  function onNadeClick(pos: { x: number; y: number }) {
    filterByCoords(pos);
    toggleMapViewVisibility();
  }

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
      setMapLoaded(true);
    }
  }

  return (
    <>
      <CSGNModal
        onDismiss={toggleMapViewVisibility}
        visible={mapViewVisisble}
        empty={true}
      >
        <div ref={mapViewRef} className="mapview">
          <img
            className="mapview-img"
            src={`/mapsoverlays/${map}.jpg`}
            alt="Map overview image"
            onLoad={onMapViewImageLoaded}
          />
          {mapLoaded &&
            nades.map(n => (
              <MapPosIcon
                key={n.id}
                nade={n}
                mapWidth={mapWidth}
                onPress={onNadeClick}
              />
            ))}
        </div>
      </CSGNModal>
      <style jsx>{`
        .mapview {
          position: relative;
        }

        .mapview-img {
          max-height: 80vh;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
