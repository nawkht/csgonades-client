import { FC } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useRouter } from "next/router";

type Props = {};

export const MapNav: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { query } = useRouter();
  const selectedMap = query.map as string;

  return (
    <>
      <PageCentralize>
        <div id="map-nav-wrap">
          <div id="map-nav">
            <ul>
              <li>
                <a href="/maps/dust2">
                  <span
                    className={
                      selectedMap === "dust2" ? "map-link selected" : "map-link"
                    }
                  >
                    Dust2
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/mirage">
                  <span
                    className={
                      selectedMap === "mirage"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Mirage
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/inferno">
                  <span
                    className={
                      selectedMap === "inferno"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Inferno
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/overpass">
                  <span
                    className={
                      selectedMap === "overpass"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Overpass
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/vertigo">
                  <span
                    className={
                      selectedMap === "vertigo"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Vertigo
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/train">
                  <span
                    className={
                      selectedMap === "train" ? "map-link selected" : "map-link"
                    }
                  >
                    Train
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/nuke">
                  <span
                    className={
                      selectedMap === "nuke" ? "map-link selected" : "map-link"
                    }
                  >
                    Nuke
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/cache">
                  <span
                    className={
                      selectedMap === "cache" ? "map-link selected" : "map-link"
                    }
                  >
                    Cache
                  </span>
                </a>
              </li>
              <li>
                <a href="/maps/anubis">
                  <span
                    className={
                      selectedMap === "anubis"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Anubis
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </PageCentralize>
      <style jsx>{`
        #map-nav-wrap {
          background: ${colors.PRIMARY};
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.3);
        }

        #map-nav {
          background: ${colors.PRIMARY};
          color: white;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          display: inline-block;
          margin: 0 auto;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        ul li {
        }

        .map-link {
          display: flex;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          padding: 10px 15px;
          color: white;
          font-size: 14px;
          align-items: center;
          font-weight: 400;
          transition: background 0.1s;
        }

        .map-link:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
