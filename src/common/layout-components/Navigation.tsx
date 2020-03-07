import { useRouter } from "next/router";
import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { MapLink } from "./MapLink";
import { ThemeToggler } from "./ThemeToggler";
export const Navigation: FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { toggleNav } = useNavigation();
  const currentRoute = router.query.name;

  return (
    <>
      <nav>
        <div className="exit-nav" onClick={toggleNav}>
          <Icon name="cancel" size="large" />
        </div>
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
        <div className="theme-toggle">
          <ThemeToggler />
        </div>
      </nav>
      <style jsx>{`
        .exit-nav {
          padding: 20px 50px;
          color: ${colors.TEXT};
        }

        nav {
          display: flex;
          flex-direction: column;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .theme-toggle {
          position: relative;
          left: 25px;
        }
      `}</style>
    </>
  );
};
