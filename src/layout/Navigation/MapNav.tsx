import { FC, memo } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { ThemeToggler } from "../Misc/ThemeToggler";
import { MapLink } from "./MapLink";

type Props = {};

export const MapNav: FC<Props> = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <nav id="map-nav">
        <PageCentralize>
          <div className="comp-wrap">
            <div className="comp">
              <span>Active duty</span>
              <ul>
                <MapLink map="dust2" />
                <MapLink map="mirage" />
                <MapLink map="inferno" />
                <MapLink map="overpass" />
                <MapLink map="vertigo" />
                <MapLink map="train" />
                <MapLink map="nuke" />
              </ul>
            </div>
            <ThemeToggler />
          </div>
        </PageCentralize>
        <div className="reserve-wrap">
          <PageCentralize>
            <div className="reserve">
              <span>Reserve</span>
              <ul>
                <MapLink map="cache" />
                <MapLink map="anubis" />
              </ul>
            </div>
            <div className="map-nav-wrap">
              <div className="map-nav-maps"></div>
            </div>
          </PageCentralize>
        </div>
      </nav>
      <style jsx>{`
        #map-nav {
          background: ${colors.PRIMARY};
        }

        .comp-wrap {
          display: flex;
          justify-content: space-between;
          padding: 8px 0px;
        }

        .reserve-wrap {
          border-top: 1px solid #0084c9;
          padding: 8px 0px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
        }

        .comp {
        }

        .comp span,
        .reserve span {
          font-size: 11px;
          font-weight: 500;
          color: #0071ad;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          #map-nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
