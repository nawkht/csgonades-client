import { FC } from "react";
import Link from "next/link";
import { CsgoMap } from "../../models/Nade";
import { UiConstants } from "../../../constants/ui";
import { Colors } from "../../../constants/colors";

type Props = {
  mapName: CsgoMap;
  currentMapPath?: string | string[];
};

export const MapLink: FC<Props> = ({ mapName, currentMapPath }) => {
  const selected = currentMapPath ? currentMapPath.includes(mapName) : false;
  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        <Link as={`/map/${mapName}`} href={`/map?name=${mapName}`}>
          <a>
            <div className="image-container">
              <img src={`/mapicons/${mapName}.png`} />
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
          padding: ${UiConstants.PADDING_MEDIUM}px
            ${UiConstants.PADDING_LARGE}px;
          width: 100%;
          transition: background 0.2s;
        }

        li a:hover {
          background: #f7f7f7;
        }

        li a img {
          width: 30px;
          margin-left: -5px;
        }

        li a .nav-text {
          align-self: center;
          margin-left: ${UiConstants.PADDING_SMALL}px;
        }

        .image-container {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-selected {
          background: ${Colors.PRIMARY_10_PERCENT};
        }
      `}</style>
    </>
  );
};

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
