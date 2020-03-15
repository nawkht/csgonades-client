import { useRouter } from "next/router";
import { FC, memo } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { ThemeToggler } from "../Misc/ThemeToggler";
import { MapLink } from "./MapLink";

type Props = {};

export const MapNav: FC<Props> = memo(({}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const currentRoute = router.query.name;

  return (
    <>
      <nav id="map-nav">
        <PageCentralize>
          <div className="map-nav-wrap">
            <ul>
              <MapLink map="dust2" currentPath={currentRoute} />
              <MapLink map="mirage" currentPath={currentRoute} />
              <MapLink map="inferno" currentPath={currentRoute} />
              <MapLink map="overpass" currentPath={currentRoute} />
              <MapLink map="train" currentPath={currentRoute} />
              <MapLink map="cache" currentPath={currentRoute} />
              <MapLink map="nuke" currentPath={currentRoute} />
              <MapLink map="vertigo" currentPath={currentRoute} />
              <MapLink map="cobblestone" currentPath={currentRoute} />
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
