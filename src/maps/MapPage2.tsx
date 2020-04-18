import { FC, useState, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { NadeFilter } from "./nadefilter/NadeFilter";
import { MapPageNades } from "./MapPageNades";
import { MapPageJumbo } from "./MapPageJumbo";
import { MobileFilter } from "./mobilefilter/MobilteFilter";
import { MapView } from "./mapview2/MapView";
import { SignInWarning } from "./components/SignInWarning";
import { Dimensions } from "../constants/Constants";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO2";
import { capitalize } from "../utils/Common";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage2: FC<Props> = memo(({ map, allNades }) => {
  useMapChangeHandler();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  function showSignInWarning() {
    setShowLoginWarning(true);
  }

  return (
    <div key={map}>
      <SEO title={capitalize(map)} canonical={`/maps/${map}`} />
      <MapPageJumbo map={map} nades={allNades} />
      <div className="map-page-container">
        <div className="map-nades">
          <div className="map-filter">
            <div className="map-filter-sticky">
              <NadeFilter showSingInWarning={showSignInWarning} />
            </div>
          </div>
          <div className="map-nade-list">
            <MapPageNades allNades={allNades} />
          </div>
        </div>
      </div>

      <MobileFilter />
      <MapView map={map} allNades={allNades} />
      <SignInWarning
        visible={showLoginWarning}
        onDismiss={() => setShowLoginWarning(false)}
        message="filter"
      />
      <style jsx>{`
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

        @media only screen and (max-width: 930px) {
          .map-nades {
            grid-template-columns: 45px auto;
            grid-template-areas: "filter nades";
          }

          .map-sidebar {
            display: none;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .map-nades {
            grid-template-columns: auto;
            grid-template-rows: auto;
            grid-template-areas: "nades";
          }

          .map-filter,
          .map-sidebar {
            display: none;
          }
        }

        @media only screen and (max-width: 500px) {
          .map-nades {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
});
