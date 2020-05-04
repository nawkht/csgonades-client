import { FC } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { PageLink } from "../common/PageLink";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../constants/Constants";

type Props = {};

export const MapNav: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <PageCentralize>
        <div id="map-nav-wrap">
          <div id="map-nav">
            <ul>
              <li>
                <PageLink href="/maps/[map]" as="/maps/dust2">
                  <span className="map-link">Dust2</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/mirage">
                  <span className="map-link">Mirage</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/inferno">
                  <span className="map-link">Inferno</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/overpass">
                  <span className="map-link">Overpass</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/vertigo">
                  <span className="map-link">Vertigo</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/train">
                  <span className="map-link">Train</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/nuke">
                  <span className="map-link">Nuke</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/cache">
                  <span className="map-link">Cache</span>
                </PageLink>
              </li>
              <li>
                <PageLink href="/maps/[map]" as="/maps/anubis">
                  <span className="map-link">Anubis</span>
                </PageLink>
              </li>
            </ul>
          </div>
        </div>
      </PageCentralize>
      <style jsx>{`
        #map-nav-wrap {
          display: flex;
          justify-content: space-around;
        }
        #map-nav {
          background: ${colors.PRIMARY};
          color: white;
          height: ${Dimensions.NAV_HEIGHT}px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          display: inline-block;
          margin: 0 auto;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        ul li {
          display: inline-flex;
          align-items: center;
          height: ${Dimensions.NAV_HEIGHT}px;
        }

        .map-link {
          display: block;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          padding: 5px 15px;
          color: white;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
