import { FC } from "react";
import { UiConstants } from "../../../constants/ui";
import { Colors } from "../../../constants/colors";
import { MapLink } from "./MapLink";
import { useRouter } from "next/router";
import Link from "next/link";

const MapNavigation: FC = () => {
  const router = useRouter();
  const currentRoute = router.query.name;
  return (
    <>
      <aside id="mapnavigation">
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
        <footer>
          <div className="copyright">© 2019 CSGO Nades</div>
          <div className="footer-links">
            <Link href="/about" as="/about">
              <a>About</a>
            </Link>{" "}
            |{" "}
            <Link href="/privacypolicy" as="/privacypolicy">
              <a>Privacy Policy</a>
            </Link>{" "}
            |{" "}
            <Link href="/contact" as="/contact">
              <a>Contact</a>
            </Link>
          </div>
        </footer>
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
          z-index: 999;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        footer {
          background: ${Colors.PRIMARY};
          color: white;
        }

        footer .footer-links {
          text-align: center;
          font-size: 0.8em;
          padding-bottom: ${UiConstants.PADDING_MEDIUM}px;
        }

        footer .footer-links a {
          color: white;
        }

        footer .footer-links a:hover {
          color: white;
          text-decoration: underline;
        }

        footer .copyright {
          padding: ${UiConstants.PADDING_MEDIUM}px
            ${UiConstants.PADDING_LARGE}px;
        }
      `}</style>
    </>
  );
};

export { MapNavigation };
