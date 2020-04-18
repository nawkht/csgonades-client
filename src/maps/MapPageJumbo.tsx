import { FC, memo } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { AdUnit } from "../common/adunits/AdUnit";
import { TopContributorList } from "./TopContributor";
import { NadeLight } from "../models/Nade/Nade";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageJumbo: FC<Props> = memo(({ map, nades }) => {
  const { colors } = useTheme();

  return (
    <>
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
            <div className="top-placement">
              <AdUnit center tagType="mega-banner" />
            </div>
          </div>
          <TopContributorList nades={nades} />
        </PageCentralize>
      </div>
      <style jsx>{`
        .map-welcome {
          background: linear-gradient(
            236.51deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          padding-bottom: 50px;
          padding-top: 50px;
          margin-bottom: 50px;
        }

        .map-welcome-wrap {
          display: flex;
          min-height: 100px;
        }

        .welcome-msg {
          align-self: center;
          margin-right: 30px;
          flex: 1;
        }

        .top-placement {
          width: 730px;
          display: flex;
          align-items: center;
        }

        .map-welcome h1,
        .map-welcome h2 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
          padding: 0;
        }

        .map-welcome h2 {
          font-size: 20px;
          margin: 0;
          margin-top: 20px;
        }

        @media only screen and (max-width: 1200px) {
          .top-placement {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
