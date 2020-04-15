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
          <div className="map-nav-wrap">
            <ul>
              <MapLink map="dust2" />
              <MapLink map="mirage" />
              <MapLink map="inferno" />
              <MapLink map="overpass" />
              <MapLink map="train" />
              <MapLink map="cache" />
              <MapLink map="nuke" />
              <MapLink map="vertigo" />
              <MapLink map="anubis" />
              <MapLink map="cobblestone" />
            </ul>
            <ThemeToggler />
          </div>
        </PageCentralize>
      </nav>
      <style jsx>{`
        #map-nav {
          background: ${colors.PRIMARY};
        }

        .map-nav-wrap {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
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
