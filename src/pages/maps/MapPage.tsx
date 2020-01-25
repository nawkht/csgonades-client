import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNadesForMap } from "../../store/NadeStore/NadeHooks";
import { Layout } from "../../ui-common/Layout";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { capitalize } from "../../utils/Common";
import { MapView } from "./MapView/MapView";
import { Filters } from "./NadeFilter/Filters";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const { nades } = useNadesForMap(map);

  return (
    <Layout title={capitalize(map)} canonical={`/maps/${map}`}>
      <div className="map-page-wrapper">
        <Filters map={map} />

        <div className="nade-list">
          <NadeListGrid
            nades={nades}
            emptyMessage={`No nades found. Sign in and add something! :)`}
          />
        </div>
      </div>

      <MapView map={map} />

      <style jsx>{`
        .map-page-wrapper {
          margin-left: 36px;
        }

        .nade-list {
          padding: ${uiDimensions.INNER_GUTTER_SIZE}px;
        }

        @media only screen and (max-width: 860px) {
          .map-page-wrapper {
            margin-left: 0;
          }
          .nade-list {
            margin-top: ${uiDimensions.INNER_GUTTER_SIZE * 2.5}px;
          }
        }

        @media only screen and (max-width: 460px) {
          .nade-list {
            margin: 0;
            margin-top: ${uiDimensions.INNER_GUTTER_SIZE}px;
          }
        }
      `}</style>
    </Layout>
  );
};
