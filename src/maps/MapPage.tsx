import { FC, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { Layout2 } from "../layout/Layout2";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useFilteredNades } from "../store2/FilterStore/hooks/useFilteredNades";
import { useLoadLatestsNades } from "../store2/FilterStore/hooks/useLoadLatestsNades";
import { capitalize } from "../utils/Common";
import { SignInWarning } from "./components/SignInWarning";
import { MapView } from "./mapview2/MapView";
import { MobileFilter } from "./mobilefilter/MobilteFilter";
import { NadeFilter } from "./nadefilter/NadeFilter";

type Props = {
  map: CsgoMap;
};

const mobileInContentAds = isMobile ? [114, 115, 116, 117, 118] : [];

export const MapPage: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const filteredNades = useFilteredNades();
  useLoadLatestsNades(map);

  const { showAllAds, codes } = useMemo(() => {
    if (
      map === "nuke" ||
      map === "cobblestone" ||
      map === "vertigo" ||
      map === "cache"
    ) {
      return {
        showAllAds: false,
        codes: [112, 104, 101, ...mobileInContentAds],
      };
    } else {
      return {
        showAllAds: true,
        codes: [112, 104, 101, 111, 113, ...mobileInContentAds],
      };
    }
  }, [map]);

  return (
    <>
      <Layout2 title={capitalize(map)} canonical={`/maps/${map}`}>
        <EzoicLoader codes={codes} />
        <div className="map-welcome">
          <PageCentralize>
            <div className="map-welcome-wrap">
              <h1>
                Find the best smokes, flashbangs, molotovs
                <br /> and grenades for {capitalize(map)}. Something missing?
                <br /> Sign in, and add a nade to help everyone out.
              </h1>
              <div className="ez top-placement">
                <EzoicPlaceHolder id={112} />
              </div>
            </div>
          </PageCentralize>
        </div>

        <div className="map-page">
          <div className="filter">
            <NadeFilter showSingInWarning={() => setShowLoginWarning(true)} />
          </div>
          <div className="nade-list">
            <NadeListGrid
              nades={filteredNades}
              emptyMessage={`No nades found.`}
            />
          </div>
          <div className="map-page-aside">
            <div className="ez placement-siderbar-top">
              <EzoicPlaceHolder id={101} />
            </div>

            {showAllAds && (
              <div className="ez placement-sidebar-middle">
                <EzoicPlaceHolder id={113} />
              </div>
            )}

            {showAllAds && (
              <div className="ez placement-siderbar-bottom">
                <EzoicPlaceHolder id={111} />
              </div>
            )}
          </div>
        </div>
        <div className="ez placement-bottom">
          <EzoicPlaceHolder id={104} />
        </div>
        <MobileFilter />
        <MapView map={map} />
        <SignInWarning
          visible={showLoginWarning}
          onDismiss={() => setShowLoginWarning(false)}
          message="filter"
        />
      </Layout2>
      <style jsx>{`
        .map-welcome {
          background: linear-gradient(
            236.51deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          padding-top: 40px;
          padding-bottom: 40px;
          margin-bottom: 40px;
        }

        .map-welcome h1 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
        }

        .map-page {
          max-width: 1660px;
          display: flex;
          margin: 0 auto;
          min-height: 70vh;
        }

        .filter {
          width: 200px;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .nade-list {
          flex: 1;
          position: relative;
          max-width: 1200px;
        }

        .map-page-aside {
          width: 200px;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .map-welcome-wrap {
          display: flex;
          align-items: center;
        }

        .ez {
        }

        .ad-test {
          width: 125px;
          height: 20px;
          background: red;
        }

        .top-placement {
          width: 500px;
          display: flex;
          justify-content: space-around;
          min-height: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
        }

        .placement-bottom {
          margin-top: 30px;
          margin-bottom: 50px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placement-sidebar-middle {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }

        .placement-siderbar-top {
          min-height: 600px;
          margin-bottom: 20px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .placement-siderbar-bottom {
          min-height: 600px;
          margin-top: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        @media only screen and (max-width: ${Dimensions.TABLET_THRESHHOLD}) {
          .filter {
            width: 70px;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .filter,
          .map-page-aside {
            display: none;
          }

          .top-placement {
            display: none;
          }

          .map-page {
            padding-left: 20px;
            padding-right: 20px;
          }

          .map-welcome-wrap {
            flex-direction: column;
          }

          .top-placement {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};
