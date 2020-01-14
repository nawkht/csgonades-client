import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeFilter } from "./NadeFilter/NadeFilter";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { useNadesForMap } from "../../store/NadeStore/NadeHooks";

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
      <style jsx>{`
        .nade-list {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-top: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          min-height: 100%;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .nade-list {
            margin: 0;
          }
        }
      `}</style>
    </Layout>
  );
};
