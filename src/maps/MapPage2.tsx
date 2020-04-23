import { FC, useState, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { NadeFilter } from "./nadefilter/NadeFilter";
import { MapPageNades } from "./MapPageNades";
import { MapPageJumbo } from "./MapPageJumbo";
import { MapView } from "./mapview2/MapView";
import { SignInWarning } from "./components/SignInWarning";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO2";
import { capitalize } from "../utils/Common";
import { TopContributorList } from "./TopContributor";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SidebarPanel } from "../common/SidebarPanel";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage2: FC<Props> = memo(({ map, allNades }) => {
  const { colors } = useTheme();
  useMapChangeHandler();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  function showSignInWarning() {
    setShowLoginWarning(true);
  }

  return (
    <>
      <div key={map} id="map-page">
        <SEO title={mapPageTitleSeo(map)} canonical={`/maps/${map}`} />
        <MapPageJumbo map={map} nades={allNades} />
        <div className="map-nade-list">
          <MapPageNades allNades={allNades} />
        </div>
      </div>

      <aside key={map}>
        <div id="map-sidebar">
          <NadeFilter showSingInWarning={showSignInWarning} />

          <SidebarPanel title="TOP CONTRIBUTOS">
            <TopContributorList nades={allNades} />
          </SidebarPanel>
        </div>
      </aside>

      <MapView map={map} allNades={allNades} />
      <SignInWarning
        visible={showLoginWarning}
        onDismiss={() => setShowLoginWarning(false)}
        message="filter"
      />
      <style jsx>{`
        .fake-ph {
          width: 300px;
          height: 250px;
          background: pink;
        }

        #map-page {
          grid-area: main;
          min-height: 100vh;
          margin: 30px;
          margin-bottom: 100px;
        }

        aside {
          grid-area: sidebar;
          width: 300px;
          background: ${colors.DP02};
        }

        #map-sidebar {
          position: sticky;
          top: calc(65px);
        }

        .map-page-container {
          max-width: ${Dimensions.PAGE_WIDTH + 2 * Dimensions.GUTTER_SIZE}px;
          margin: 0 auto;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .map-nades {
          display: grid;
          grid-template-columns: 45px 1fr;
          grid-template-rows: auto;
          grid-template-areas: "filter nades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .map-filter {
          grid-area: filter;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        .map-filter-sticky {
          position: sticky;
          top: 50px;
        }

        @media only screen and (max-width: 1210px) {
          #map-page {
            margin-right: 30px;
          }

          aside {
            width: 100%;
          }
        }

        @media only screen and (max-width: 910px) {
          #map-page {
            margin: 15px;
          }
        }

        @media only screen and (max-width: 400px) {
          #map-page {
            margin: 0;
            margin-bottom: 50px;
          }
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsgoMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
