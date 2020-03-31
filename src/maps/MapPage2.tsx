import { FC, useState, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { NadeFilter } from "./nadefilter/NadeFilter";
import { MapPageNades } from "./MapPageNades";
import { MapPageJumbo } from "./MapPageJumbo";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { MapPageSideBar } from "./MapPageSidebar";
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
      <MapPageJumbo map={map} />
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
          <div className="map-sidebar">
            <MapPageSideBar map={map} />
          </div>
        </div>

        <div className="map-nades-bottom">
          <EzoicPlaceHolder id={104} />
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
          max-width: calc(1920px);
          margin: 0 auto;
        }

        .map-nades {
          display: grid;
          grid-template-columns: 300px 1fr 300px;
          grid-template-rows: auto;
          grid-template-areas: "filter nades ad";
          grid-column-gap: 30px;
          margin-left: 30px;
          margin-right: 30px;
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

        .map-nade-list {
          grid-area: nades;
        }

        .map-sidebar {
          grid-area: ad;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .map-nades-bottom {
          margin-top: 150px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        @media only screen and (max-width: 1700px) {
          .map-page-container {
            max-width: calc(1200px + 320px + 60px + 60px);
          }
          .map-nades {
            grid-template-columns: 160px auto 160px;
            grid-template-areas: "filter nades ad";
          }
        }

        @media only screen and (max-width: 1400px) {
          .map-nades {
            grid-template-columns: 45px auto 160px;
            grid-template-areas: "filter nades ad";
          }
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
