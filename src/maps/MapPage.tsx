import { FC } from "react";
import { SidebarBanner } from "../common/ads/SideBarBanner";
import { Layout2 } from "../common/layout/Layout2";
import { NadeListGrid } from "../common/NadeListGrid";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNadesForMap } from "../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { MapView } from "./MapView/MapView";
import { Filters } from "./NadeFilter/Filters";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const { nades } = useNadesForMap(map);
  const loading = useIsLoadingNade();

  return (
    <Layout2 title={capitalize(map)} canonical={`/maps/${map}`}>
      <Filters map={map} />

      <div className="map-page-wrapper">
        <div className="nade-list">
          <NadeListGrid
            loading={loading}
            nades={nades}
            emptyMessage={`No nades found. Sign in and add something! :)`}
          />
        </div>

        <div className="a-browser">
          <div className="map-description">
            <h3>{capitalize(map)}</h3>
            <p>
              Find the best smokes, molotovs, flashbangs and he-grenades for{" "}
              {capitalize(map)}.<br /> If you know a nade that is missing, sign
              in and add it! 🎉😎💯
            </p>
          </div>
          <SidebarBanner />
        </div>
      </div>

      <MapView map={map} />

      <style jsx>{`
        .map-page-wrapper {
          margin-left: 36px;
          margin-right: calc(${Dimensions.GUTTER_SIZE} + 200px);
        }

        .map-description {
          background: ${colors.DP01};
          border-radius: 3px;
          margin-bottom: 12px;
          border: 1px solid ${colors.BORDER};
        }

        .map-description h3 {
          background: ${colors.DP02};
          color: ${colors.TEXT};
          border-bottom: 1px solid ${colors.BORDER};
          padding: 6px 12px;
          font-size: 1.2em;
        }

        .map-description p {
          padding: 12px;
          padding-top: 0;
          color: ${colors.TEXT};
        }

        .a-browser {
          position: fixed;
          top: calc(${Dimensions.HEADER_HEIGHT} + ${Dimensions.GUTTER_SIZE});
          right: ${Dimensions.GUTTER_SIZE};
          bottom: 50px;
          max-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .nade-list {
          padding: ${Dimensions.GUTTER_SIZE};
        }

        .a-container {
          margin: 24px auto;
          max-width: 1000px;
          border: 1px solid orange;
        }

        @media only screen and (max-width: 860px) {
          .map-page-wrapper {
            margin-left: 0;
            margin-right: 0;
          }

          .a-browser {
            display: none;
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
    </Layout2>
  );
};
