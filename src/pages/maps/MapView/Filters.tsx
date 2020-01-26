import { FC } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Popup } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useIsSignedIn } from "../../../store/AuthStore/AuthHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { FavoriteFilterButton } from "./FavoriteFilterButton";
import { NadeTypeFilters } from "./NadeTypeFilters";
import { ResetButton } from "./ResetButton";

type Props = {
  map: CsgoMap;
  onOpenOpen: () => void;
  mapViewIsOpen: boolean;
};

export const Filters: FC<Props> = ({ map, onOpenOpen, mapViewIsOpen }) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();

  return (
    <>
      <div className="filters">
        {!mapViewIsOpen && (
          <Popup
            content={"Show map"}
            hoverable
            position="right center"
            inverted
            mouseEnterDelay={500}
            openOnTriggerClick={false}
            size="tiny"
            trigger={
              <div className="map-toggle" onClick={onOpenOpen}>
                <FaMapMarkedAlt />
              </div>
            }
          />
        )}

        {mapViewIsOpen && (
          <div className="map-toggle active" onClick={onOpenOpen}>
            <MdClose />
          </div>
        )}

        <NadeTypeFilters map={map} />
        {isSignedIn && <FavoriteFilterButton map={map} />}
        <ResetButton map={map} />
      </div>
      <style jsx>{`
        .map-toggle {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-right: 2px;
          margin-bottom: 12px;
          height: 45px;
          background: ${colors.filterBg};
          font-size: 1.7em;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
          color: ${colors.filterColor};
          transition: background 0.15s;
        }

        .map-toggle:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: #b50c00;
        }

        .active:hover {
          background: #b50c00;
        }
      `}</style>
    </>
  );
};
