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
            <ul id="map-nav-list">
              <MapLink map="dust2" />
              <MapLink map="mirage" />
              <MapLink map="inferno" />
              <MapLink map="overpass" />
              <MapLink map="vertigo" />
              <MapLink map="train" />
              <MapLink map="nuke" />
              <MapLink map="cache" />
              <MapLink map="anubis" isNew={true} />
              <span id="acduty-label">Active duty</span>
              <span id="r-label">Reserve</span>
            </ul>
            <ThemeToggler />
          </div>
        </PageCentralize>
      </nav>
      <style jsx>{`
        #map-nav {
          background: ${colors.PRIMARY};
        }

        #map-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: auto 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-template-areas:
            "acduty dust2 mirage inferno overpass vertigo train nuke"
            "reserve cache anubis . . . . .";
        }

        #ad-label {
          grid-area: acduty;
        }

        #r-label {
          grid-area: reserve;
        }

        #acduty-label,
        #r-label {
          font-size: 12px;
          font-weight: 500;
          padding: 15px 10px;
          min-width: 83px;
          background: rgba(0, 0, 0, 0.1);
          color: white;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-top: none;
        }

        .comp-wrap {
          display: flex;
          justify-content: space-between;
        }

        .reserve-wrap {
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
