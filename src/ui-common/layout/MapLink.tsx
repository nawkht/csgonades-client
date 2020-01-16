import { FC } from "react";
import Link from "next/link";
import { capitalize } from "../../utils/Common";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";

type Props = {
  mapName: CsgoMap;
  currentMapPath?: string | string[];
};

export const MapLink: FC<Props> = ({ mapName, currentMapPath }) => {
  const { colors, uiDimensions, durations } = useTheme();

  const selected = currentMapPath ? currentMapPath.includes(mapName) : false;
  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        <Link as={`/maps/${mapName}`} href={`/maps?name=${mapName}`}>
          <a>
            <div className="image-container">
              <img
                src={`/mapicons/${mapName}.png`}
                alt={`navigation icon for ${mapName}`}
              />
            </div>
            <span className="nav-text">{capitalize(mapName)}</span>
          </a>
        </Link>
      </li>
      <style jsx>{`
        li a {
          text-decoration: none;
          display: inline-flex;
          align-content: center;
          color: #444;
          width: 100%;
          transition: background ${durations.transition}s;
          padding: ${uiDimensions.PADDING_MEDIUM}px
            ${uiDimensions.PADDING_LARGE * 2}px ${uiDimensions.PADDING_MEDIUM}px
            ${uiDimensions.PADDING_LARGE}px;
        }

        li a:hover {
          background: #f7f7f7;
        }

        li a img {
          width: 25px;
        }

        li a .nav-text {
          align-self: center;
          margin-left: ${uiDimensions.PADDING_SMALL}px;
        }

        .image-container {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-selected {
          background: ${colors.PRIMARY_10_PERCENT};
        }
      `}</style>
    </>
  );
};
