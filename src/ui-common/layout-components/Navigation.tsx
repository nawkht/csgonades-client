import { useRouter } from "next/router";
import { FC } from "react";
import { FaDiscord } from "react-icons/fa";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { MapLink } from "./MapLink";
export const Navigation: FC = () => {
  const { colors, uiDimensions, durations, layers } = useTheme();
  const router = useRouter();
  const currentRoute = router.query.name;

  return (
    <>
      <nav>
        <ul>
          <MapLink mapName="dust2" currentMapPath={currentRoute} />
          <MapLink mapName="mirage" currentMapPath={currentRoute} />
          <MapLink mapName="inferno" currentMapPath={currentRoute} />
          <MapLink mapName="overpass" currentMapPath={currentRoute} />
          <MapLink mapName="train" currentMapPath={currentRoute} />
          <MapLink mapName="cache" currentMapPath={currentRoute} />
          <MapLink mapName="nuke" currentMapPath={currentRoute} />
          <MapLink mapName="vertigo" currentMapPath={currentRoute} />
          <MapLink mapName="cobblestone" currentMapPath={currentRoute} />
        </ul>
        <ul id="secondary-nav">
          <li>
            <a
              className="discord-link"
              target="_black"
              href="https://discord.gg/010h0KFCBNASyMUKv"
              rel="nofollow"
            >
              <span className="discord-link-text">
                <FaDiscord style={{ marginRight: 6, fontSize: "1.5em" }} />
                Join Discord
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        #secondary-nav {
          margin-top: 36px;
          padding: 12px;
        }

        .discord-link {
          background: #768ad4;
          display: flex;
          justify-content: space-around;
          padding: 12px;
          width: 100%;
          color: #444;
          color: white;
          border-radius: 4px;
          transition: background 0.15s;
          font-weight: normal;
        }

        .discord-link:hover {
          background: #6b7dbf;
        }

        .discord-link-text {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
