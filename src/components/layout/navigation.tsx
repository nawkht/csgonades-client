import { FC } from "react";
import Link from "next/link";
import { UiConstants } from "../../../constants/ui";
import { Colors } from "../../../constants/colors";

const MapNavigation: FC = () => {
  return (
    <>
      <aside id="mapnavigation">
        <nav>
          <ul>
            <li>
              <Link as="/map/dust2" href="/map?name=dust2">
                <a className="nav-selected">
                  <img src="/mapicons/dust2.png" />{" "}
                  <span className="nav-text">Dust2</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/mirage" href="/map?name=mirage">
                <a>
                  <img src="/mapicons/mirage.png" />{" "}
                  <span className="nav-text">Mirage</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/cache" href="/map?name=cache">
                <a>
                  <img src="/mapicons/cache.png" />{" "}
                  <span className="nav-text">Cache</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/nuke" href="/map?name=nuke">
                <a>
                  <img src="/mapicons/nuke.png" />{" "}
                  <span className="nav-text">Nuke</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/inferno" href="/map?name=inferno">
                <a>
                  <img src="/mapicons/inferno.png" />{" "}
                  <span className="nav-text">Inferno</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/overpass" href="/map?name=overpass">
                <a>
                  <img src="/mapicons/overpass.png" />{" "}
                  <span className="nav-text">Overpass</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/cobblestone" href="/map?name=cobblestone">
                <a>
                  <img src="/mapicons/cobblestone.png" />{" "}
                  <span className="nav-text">Cobblestone</span>
                </a>
              </Link>
            </li>
            <li>
              <Link as="/map/train" href="/map?name=train">
                <a>
                  <img src="/mapicons/train.png" />{" "}
                  <span className="nav-text">Train</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <footer>© 2019 CSGO Nades</footer>
      </aside>
      <style jsx>{`
        #mapnavigation {
          position: fixed;
          top: ${UiConstants.HEADER_HEIGHT}px;
          bottom: 0;
          width: ${UiConstants.SIDEBAR_WIDTH}px;
          border-right: 1px solid ${Colors.PRIMARY_BORDER};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li a {
          text-decoration: none;
          display: inline-flex;
          align-content: center;
          color: #444;
          padding: 12px 18px;
          width: 100%;
          transition: background 0.2s;
        }

        li a:hover {
          background: #f7f7f7;
        }

        li a img {
          width: 30px;
          height: 30px;
        }

        li a .nav-text {
          align-self: center;
          margin-left: 6px;
        }

        .nav-selected {
          background: #f5f9ff;
        }

        footer {
          background: #24afff;
          padding: 6px 12px;
        }
      `}</style>
    </>
  );
};

export { MapNavigation };
