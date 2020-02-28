import { FC } from "react";
import AmazonAffiliateAdd from "../common/ads/AmazonAffiliateAd";
import { Layout } from "../common/Layout";
import { NadeListGrid } from "../common/NadeListGrid";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNadesForMap } from "../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { capitalize } from "../utils/Common";
import { MapView } from "./MapView/MapView";
import { Filters } from "./NadeFilter/Filters";

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
      </div>

      <div className="ad-container" key={map}>
        <AmazonAffiliateAdd />
      </div>

      <MapView map={map} />

      <style jsx>{`
        .map-page-wrapper {
          margin-left: 36px;
        }

        .nade-list {
          padding: ${Dimensions.GUTTER_SIZE};
        }

        .ad-container {
          margin: 24px auto;
          max-width: 1000px;
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
