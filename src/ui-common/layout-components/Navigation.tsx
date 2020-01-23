import { useRouter } from "next/router";
import { FC } from "react";
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
      </nav>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
};
