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
                <MapLink map="anubis" isNew={true} />
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
        }

        .reserve-wrap {
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
        }

        .comp,
        .reserve {
          display: flex;
          align-items: center;
          margin-bottom: -1px;
        }

        .comp span,
        .reserve span {
          font-size: 12px;
          font-weight: 500;
          padding: 15px 10px;
          min-width: 83px;
          background: rgba(0, 0, 0, 0.1);
          color: white;
          border: 1px solid rgba(0, 0, 0, 0.15);
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
