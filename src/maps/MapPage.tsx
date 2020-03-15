import { FC, memo, useMemo, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { NadeListWithAds } from "../common/NadeListMobile/NadeListWithAds";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { SignInWarning } from "./components/SignInWarning";
import { MapPageNades } from "./MapPageNades";
import { MapView } from "./mapview2/MapView";
import { MobileFilter } from "./mobilefilter/MobilteFilter";
import { NadeFilter } from "./nadefilter/NadeFilter";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { NadeLight } from "../models/Nade/Nade";
import { SEO } from "../layout/SEO2";

type Props = {
  map: CsgoMap;
  ssrNades: NadeLight[];
};

const sizeBarWidth = 160;
const mainWidth = 1200;
const spacing = 30;

export const MapPage: FC<Props> = memo(({ map, ssrNades }) => {
  useMapChangeHandler();
  const { colors } = useTheme();
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  const reducedAds = useMemo(() => {
    const reducedsMapAds = ["nuke", "cobblestone", "vertigo", "cache"];
    return reducedsMapAds.includes(map);
  }, [map]);

  function showSignInWarning() {
    setShowLoginWarning(true);
  }

  return (
    <>
      <SEO title={capitalize(map)} canonical={`/maps/${map}`} />
      <div className="map-welcome">
        <PageCentralize>
          <div className="map-welcome-wrap">
            <div className="welcome-msg">
              <h1>
                Find the best smokes, flashbangs, molotovs and grenades for{" "}
                {capitalize(map)}.
              </h1>
              <h2>
                Something missing?
                <br /> Sign in, and add a nade to help everyone out.
              </h2>
            </div>
            <div className="ez top-placement">
              <EzoicPlaceHolder key="Map page | In top title" id={112} />
            </div>
          </div>
        </PageCentralize>
      </div>

      <div className="map-page-wrap">
        <div className="map-page">
          <div className="filter">
            <div className="sticky-sidebar">
              <NadeFilter showSingInWarning={showSignInWarning} />
            </div>
          </div>
          <div className="nade-list">
            {isMobileOnly && <NadeListWithAds ssrNades={ssrNades} />}
            {!isMobileOnly && <MapPageNades ssrNades={ssrNades} />}
          </div>
          <div className="map-page-aside">
            <div className="ez placement-siderbar-top">
              <EzoicPlaceHolder key="Map page | Sidebar Top" id={101} />
            </div>

            {!reducedAds && (
              <div className="ez placement-siderbar-bottom">
                <EzoicPlaceHolder key="Map page | Sidebar Middle" id={111} />
              </div>
            )}

            <div className="ez empty"></div>
          </div>
        </div>
      </div>
      <div className="ez placement-bottom">
        <EzoicPlaceHolder key="Map page | Under nade list" id={104} />
      </div>
      <MobileFilter />
      <MapView map={map} />
      <SignInWarning
        visible={showLoginWarning}
        onDismiss={() => setShowLoginWarning(false)}
        message="filter"
      />
      {/*</Layout2>*/}
      <style jsx>{`
        .map-welcome {
          background: linear-gradient(
            236.51deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          margin-bottom: 40px;
          padding-bottom: 40px;
        }

        .map-welcome-wrap {
          display: flex;
          align-items: center;
        }

        .welcome-msg {
          align-self: center;
          margin-top: 40px;
          margin-right: 40px;
          width: 100%;
        }

        .map-welcome h1,
        .map-welcome h2 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
        }

        .map-welcome h2 {
          font-size: 20px;
          margin: 0;
          margin-top: 20px;
        }

        .map-page-wrap {
          margin: 0 auto;
          max-width: calc(
            ${mainWidth}px + ${2 * sizeBarWidth}px + ${4 * spacing}px
          );
          padding-left: ${spacing}px;
          padding-right: ${spacing}px;
        }

        .map-page {
          display: flex;
        }

        .filter {
          width: ${sizeBarWidth}px;
          margin-right: ${spacing}px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .sticky-sidebar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: sticky;
          top: 50px;
          width: 45px;
        }

        .nade-list {
          flex: 1;
          position: relative;
          max-width: ${mainWidth}px;
        }

        .map-page-aside {
          width: ${sizeBarWidth}px;
          margin-left: ${spacing}px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .placement-sidebar-left {
          width: 120px;
          max-height: 600px;
        }

        .ad-test {
          width: 125px;
          height: 20px;
          background: red;
        }

        .top-placement {
          min-width: 730px;
          height: 105px;
        }

        .placement-bottom {
          margin-top: 50px;
          margin-bottom: 50px;
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

        @media only screen and (max-width: ${Dimensions.MEDIUM_DEVIDE}) {
          .filter {
            width: 45px;
          }

          .placement-sidebar-left {
            display: none;
          }
        }

        @media only screen and (max-width: ${Dimensions.TABLET_THRESHHOLD}) {
          .map-welcome-wrap {
            flex-direction: column;
          }

          .welcome-msg {
            margin-right: 0;
            margin-bottom: 20px;
          }

          .filter {
            width: 45px;
          }

          .placement-sidebar-left {
            display: none;
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
            padding: 0;
          }

          .map-welcome-wrap {
            flex-direction: column;
          }

          .top-placement {
            width: 100%;
          }

          .map-page-wrap {
            padding: 0;
          }
        }
      `}</style>
    </>
  );
});
