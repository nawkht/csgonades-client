import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useNadesForMap } from "../../store/NadeStore/NadeHooks";
import { Layout } from "../../ui-common/layout/Layout";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { capitalize } from "../../utils/Common";
import { MapPositionModal } from "./NadeFilter/MapPositionModal";
import { NadeFilter } from "./NadeFilter/NadeFilter";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const { nades } = useNadesForMap(map);

  return (
    <Layout title={capitalize(map)} canonical={`/maps/${map}`}>
      <NadeFilter map={map} />

      <div className="nade-list">
        <NadeListGrid
          nades={nades}
          emptyMessage={`No nades found for ${capitalize(
            map
          )} on these settings, maybe you can add some!`}
        />
      </div>

      <MapPositionModal map={map} />

      <style jsx>{`
        .nade-list {
          padding: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }

        @media only screen and (max-width: 860px) {
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
