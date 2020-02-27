import dynamic from "next/dynamic";
import { FC } from "react";
import { Layout } from "../common/Layout";
import { NadeListGrid } from "../common/NadeListGrid";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNadesForMap } from "../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { capitalize } from "../utils/Common";
import { MapView } from "./MapView/MapView";
import { Filters } from "./NadeFilter/Filters";

const TestAd = dynamic(() => import("../common/ads/TestAd"), {
  ssr: false,
});

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { nades } = useNadesForMap(map);
  const loading = useIsLoadingNade();

  return (
    <Layout title={capitalize(map)} canonical={`/maps/${map}`}>
      <div className="map-page-wrapper">
        <Filters map={map} />

        <div className="nade-list">
          <NadeListGrid
            loading={loading}
            nades={nades}
            emptyMessage={`No nades found. Sign in and add something! :)`}
          />
        </div>
        <TestAd key={map} />
      </div>

      <MapView map={map} />

      <style jsx>{`
        .map-page-wrapper {
          margin-left: 36px;
        }

        .nade-list {
          padding: ${Dimensions.GUTTER_SIZE};
        }

        @media only screen and (max-width: 860px) {
          .map-page-wrapper {
            margin-left: 0;
          }
          .nade-list {
            padding: ${Dimensions.PADDING_MEDIUM};
            margin-top: calc(${Dimensions.GUTTER_SIZE} * 2);
          }
        }

        @media only screen and (max-width: 460px) {
          .nade-list {
            margin: 0;
            margin-top: ${Dimensions.GUTTER_SIZE};
          }
        }
      `}</style>
    </Layout>
  );
};
