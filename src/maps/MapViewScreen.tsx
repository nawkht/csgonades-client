import { FC, useRef, useState } from "react";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { Dimensions } from "../constants/Constants";
import { useNadesForMapView } from "../store/MapStore/hooks/useNadesForMapView";
import { NadeLight } from "../models/Nade/Nade";
import { MapPosIcon } from "./mapview2/MapPosIcon";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { filterByCoords } from "../store/MapStore/hooks/helpers";
import { MapViewSuggested } from "./MapViewSuggested";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapViewScreen: FC<Props> = ({ allNades, map }) => {
  const filteredNades = useFilterServerSideNades(allNades);
  const { mapView } = useSetMapView();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );
  const [mapWidth, setMapWidth] = useState(0);
  const nades = useNadesForMapView(allNades);
  const mapViewRef = useRef<HTMLDivElement>(null);

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
      setMapLoaded(true);
    }
  }

  function onNadeClick(pos: { x: number; y: number }) {
    const suggested = filterByCoords(filteredNades, pos);
    setSuggestedNades(suggested);
  }

  if (mapView === "list") {
    return null;
  }

  return (
    <>
      <MapViewSuggested
        onDismiss={() => setSuggestedNades(null)}
        nades={suggestedNades}
      />
      <div id="mapview-wrap">
        <div id="mapview-screen">
          <div id="mapview" ref={mapViewRef}>
            <img
              src={`/mapsoverlays/${map}.jpg`}
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
      </div>
      <style jsx>{`
        #mapview-screen {
          height: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 3}px - 80px
          );
          width: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 3}px - 80px
          );
          max-height: 1000px;
          max-width: 1000px;
        }

        #mapview-wrap {
          background: #151515;
          border-radius: 5px;
          display: flex;
          justify-content: space-around;
          margin-bottom: 50px;
        }

        #mapview {
          position: relative;
        }

        #mapview img {
          width: 100%;
          display: block;
        }
      `}</style>
    </>
  );
};
