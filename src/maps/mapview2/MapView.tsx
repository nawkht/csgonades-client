import { FC, useRef, useState } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { MapPosIcon } from "./MapPosIcon";
import { useToggleMapview } from "../../store/MapStore/hooks/useToggleMapView";
import { useNadesForMapView } from "../../store/MapStore/hooks/useNadesForMapView";
import { useFilterByCoords } from "../../store/MapStore/hooks/useFilterByCoords";
import { NadeLight } from "../../models/Nade/Nade";
import { FaTimes } from "react-icons/fa";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapView: FC<Props> = ({ map, allNades }) => {
  const { mapViewOpen, toggleMapViewVisibility } = useToggleMapview();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadesForMapView(allNades);
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
        visible={mapViewOpen}
        empty={true}
      >
        <div ref={mapViewRef} className="mapview">
          <div className="mapview-stuff">
            <div id="mapview-close" onClick={toggleMapViewVisibility}>
              <FaTimes />
            </div>
            <img
              className="mapview-img"
              src={`/mapsoverlays/${map}.jpg`}
              alt="Map overview image"
              onLoad={onMapViewImageLoaded}
            />
            {mapLoaded &&
              nades.map((n) => (
                <MapPosIcon
                  key={n.id}
                  nade={n}
                  mapWidth={mapWidth}
                  onPress={onNadeClick}
                />
              ))}
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .mapview {
          display: flex;
          justify-content: space-around;
        }

        .mapview-stuff {
          position: relative;
        }

        #mapview-close {
          position: absolute;
          top: 10px;
          right: 10px;
          color: white;
          cursor: pointer;
          font-size: 30px;
        }

        .mapview-img {
          max-height: 80vh;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
