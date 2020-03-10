import { FC, useState } from "react";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../common/layout/Layout2";
import { NadeListGrid } from "../common/NadeListGrid";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { useNadesForMap } from "../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { SignInWarning } from "./components/SignInWarning";
import { MapView } from "./mapview/MapView";
import { MobileFilter } from "./mobilefilter/MobilteFilter";
import { NadeFilter } from "./nadefilter/NadeFilter";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const [mapViewVisible, setMapViewVisisble] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const { nades } = useNadesForMap(map);
  const loading = useIsLoadingNade();

  return (
    <>
      <Layout2 title={capitalize(map)} canonical={`/maps/${map}`}>
        <EzoicLoader codes={[104, 101, 102]} />
        <div className="map-welcome">
          <PageCentralize>
            <h1>
              Find the best smokes, flashbangs, molotovs and grenades for{" "}
              {capitalize(map)}.
              <br />
              Something missing? Sign in, and add a nade to help everyone out.
            </h1>
          </PageCentralize>
        </div>

        <div className="top-placement">
          <EzoicPlaceHolder id={102} />
        </div>

        <div className="map-page">
          <div className="filter">
            <NadeFilter
              showSingInWarning={() => setShowLoginWarning(true)}
              showMapView={() => setMapViewVisisble(true)}
            />
          </div>
          <div className="nade-list">
            <NadeListGrid
              loading={loading}
              nades={nades}
              emptyMessage={`No nades found. Sign in and add something! :)`}
            />

            <div className="placement-bottom">
              <EzoicPlaceHolder id={104} />
            </div>
          </div>
          <div className="map-page-aside">
            <div className="sticky">
              <EzoicPlaceHolder id={101} />
            </div>
          </div>
        </div>
        <MobileFilter />
        <MapView
          closeMapView={() => setMapViewVisisble(false)}
          visible={mapViewVisible}
          map={map}
        />
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
          padding-top: 50px;
          padding-bottom: 50px;
        }

        .sticky {
          position: sticky;
          top: 50px;
        }

        .top-placement {
          margin-top: 30px;
          margin-bottom: 30px;
          height: 90px;
        }

        .map-welcome h1 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
        }

        .map-page {
          max-width: 1660px;
          display: flex;
          margin: 0 auto;
          padding-bottom: 100px;
          min-height: 80vh;
        }

        .filter {
          width: 200px;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .map-page-aside {
          width: 200px;
          margin-left: 30px;
          max-height: 1200px;
          min-height: 600px;
        }

        .nade-list {
          flex: 1;
          position: relative;
          max-width: 1200px;
        }

        .placement-bottom {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .filter,
          .map-page-aside {
            display: none;
          }

          .map-page {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
};
