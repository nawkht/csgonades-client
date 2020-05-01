import { FC, useState, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { MapPageNades } from "./MapPageNades";
import { MapPageJumbo } from "./MapPageJumbo";
import { MapView } from "./mapview2/MapView";
import { SignInWarning } from "./components/SignInWarning";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO2";
import { capitalize } from "../utils/Common";
import { TopContributorList } from "./TopContributor";
import { SidebarPanel } from "../common/SidebarPanel";
import { AdUnit } from "../common/adunits/AdUnit";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SortingMethodSelector } from "./SortingMethodSelector";
import { useAnalytics } from "../utils/Analytics";
import { MapViewFilter } from "./nadefilter/MapViewFilter";
import { TypeFilter } from "./nadefilter/TypeFilter";
import { TickrateSelector } from "./nadefilter/TickrateSelector";
import { FavFilterButton } from "./nadefilter/FavFilterButton";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage2: FC<Props> = memo(({ map, allNades }) => {
  const { colors } = useTheme();
  const { event } = useAnalytics();
  useMapChangeHandler();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  function showSignInWarning() {
    setShowLoginWarning(true);
    event({
      category: "Sign In Warning",
      action: "Favorite Not Signed In",
    });
  }

  function dismissSignInWarning() {
    setShowLoginWarning(false);
    event({
      category: "Sign In Warning",
      action: "Dismiss",
    });
  }

  return (
    <>
      <div key={"map-" + map} id="map-page">
        <SEO
          title={mapPageTitleSeo(map)}
          canonical={`/maps/${map}`}
          description={`Find the best smoke, flashbang, molotov and grenade spots for ${capitalize(
            map
          )}. Browse our large collection of nades for CS:GO.`}
        />
        <MapPageJumbo map={map} nades={allNades} />
        <div id="filters">
          <div id="filter-map">
            <MapViewFilter />
          </div>
          <div id="filter-sort">
            <SortingMethodSelector />
          </div>
          <div id="filter-type">
            <TypeFilter />
          </div>
          <div id="fitler-tick">
            <TickrateSelector />
          </div>
          <div id="filter-fav">
            <FavFilterButton showSingInWarning={showSignInWarning} />
          </div>
        </div>
        <div className="map-nade-list">
          <MapPageNades allNades={allNades} />
        </div>
      </div>

      <aside key={"side" + map}>
        <div id="map-sidebar">
          <SidebarPanel last title="TOP CONTRIBUTORS">
            <TopContributorList nades={allNades} />
          </SidebarPanel>
          <div className="ph-unit">
            <AdUnit tagType="300x250" />
          </div>
        </div>
      </aside>

      <MapView map={map} allNades={allNades} />
      <SignInWarning
        visible={showLoginWarning}
        onDismiss={dismissSignInWarning}
        message="filter"
      />
      <style jsx>{`
        #filters {
          margin-bottom: 30px;
          z-index: 999;
          border-radius: 5px;
          display: grid;
          grid-template-columns: min-content min-content min-content min-content min-content;
          grid-template-rows: auto;
          grid-template-areas: "mapfilter sortfilter typefilter tickfilter favfilter";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        #filter-map {
          grid-area: mapfilter;
        }

        #filter-sort {
          grid-area: sortfilter;
        }

        #filter-type {
          grid-area: typefilter;
        }

        #filter-tick {
          grid-area: tickfilter;
        }

        #filter-fav {
          grid-area: favfilter;
        }

        .ph-unit {
        }

        #map-page {
          grid-area: main;
          min-height: 100vh;
          margin: ${Dimensions.GUTTER_SIZE}px;
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

        @media only screen and (max-width: 700px) {
          #filters {
            display: grid;
            grid-template-columns: min-content min-content min-content min-content;
            grid-template-rows: auto auto;
            grid-template-areas:
              "sortfilter sortfilter typefilter typefilter"
              "tickfilter favfilter . .";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          #filter-map {
            display: none;
          }
        }

        @media only screen and (max-width: 450px) {
          #filters {
            display: grid;
            grid-template-columns: min-content min-content;
            grid-template-rows: auto auto;
            grid-template-areas:
              "sortfilter tickfilter"
              "typefilter favfilter";
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          #filter-map {
            display: none;
          }
        }

        @media only screen and (max-width: 400px) {
          #map-page {
            margin: 10px;
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
