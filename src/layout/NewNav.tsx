import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { MapLink } from "../layout/Navigation/MapLink";

type Props = {};

export const NewNav: FC<Props> = ({}) => {
  const { colors } = useTheme();
  return (
    <>
      <div id="nav">
        <div id="active-duty-nades">
          <span className="nav-label">ACTIVE DUTY NADES</span>
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
        <div id="reserve-nades">
          <span className="nav-label">RESERVE NADES</span>
          <ul>
            <MapLink map="cache" />
            <MapLink map="anubis" />
          </ul>
        </div>
      </div>
      <style jsx>{`
        #nav {
          position: sticky;
          top: calc(65px + 30px);
        }

        #active-duty-nades,
        #reserve-nades {
          background: ${colors.DP02};
          padding-bottom: 15px;
          overflow: hidden;
        }

        #active-duty-nades {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        #reserve-nades {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .nav-label {
          font-weight: 500;
          font-size: 12px;
          display: block;
          white-space: nowrap;
          padding: 15px 30px;
          background: ${colors.PRIMARY};
          color: white;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
};
