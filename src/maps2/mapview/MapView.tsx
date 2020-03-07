import { FC, useRef, useState } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { MapPosIcon } from "../../maps/MapView/MapPosIcon";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";
import { useNadeCoordinatesForMap } from "../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
  visible: boolean;
  closeMapView: () => void;
};

export const MapView: FC<Props> = ({ visible, map, closeMapView }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadeCoordinatesForMap(map);
  const { filterByMapCoords } = useNadeFilter();
  const mapViewRef = useRef<HTMLDivElement>(null);

  function onNadeClick(pos: { x: number; y: number }) {
    filterByMapCoords(pos);
    closeMapView();
  }

  if (!visible) {
    return null;
  }

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
      setMapLoaded(true);
    }
  }

  return (
    <>
      <CSGNModal onDismiss={closeMapView} visible={true} empty={true}>
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
