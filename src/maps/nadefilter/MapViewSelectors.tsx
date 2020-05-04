import { FC } from "react";
import { useSetMapView } from "../../store/MapStore/hooks/useSetMapView";
import { FaMap, FaListUl } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Popup } from "semantic-ui-react";
import { useShowViewSelectorHint } from "../../store/GlobalStore/hooks/useShowViewSelectorHint";

type Props = {
  vertical?: boolean;
};

export const MapViewSelector: FC<Props> = ({ vertical }) => {
  const { colors } = useTheme();
  const { mapView, setMapView } = useSetMapView();
  const {
    shouldShowViewSelectorHint,
    hideViewSelectorHint,
  } = useShowViewSelectorHint();

  return (
    <>
      <div className="view-selector">
        <div className="label">
          <Popup
            inverted
            size="tiny"
            content={
              <div className="view-hint">
                <div>
                  <b>New!</b> Try a diffrent view
                </div>
                <button onClick={hideViewSelectorHint}>Close</button>
              </div>
            }
            open={!vertical && shouldShowViewSelectorHint}
            trigger={<span>VIEW</span>}
          />
        </div>
        <div className="view-selector-btns">
          <button
            className={
              mapView === "overview" ? "selector selected" : "selector"
            }
            onClick={() => setMapView("overview")}
          >
            <FaMap />
          </button>
          <button
            className={mapView === "list" ? "selector selected" : "selector"}
            onClick={() => setMapView("list")}
          >
            <FaListUl />
          </button>
        </div>
      </div>
      <style jsx>{`
        .view-hint {
        }

        .view-hint button {
          background: transparent;
          color: white;
          border: 1px solid white;
          outline: none;
          margin-top: 5px;
          padding: 7px;
          width: 100%;
          font-weight: 400;
          border-radius: 5px;
          cursor: pointer;
        }

        .view-hint button:hover {
          background: ${colors.filterBgHover};
        }

        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          color: ${vertical ? "white" : colors.TEXT};
        }

        .view-selector-btns {
          display: flex;
          flex-direction: ${vertical ? "column" : "row"};
          background: ${colors.filterBg};
          overflow: hidden;
          border-radius: 5px;
        }

        .selector {
          border: none;
          outline: none;
          background: ${colors.filterBg};
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: white;
          font-size: ${Dimensions.BUTTON_HEIGHT / 2}px;
          cursor: pointer;
          overflow: hidden;
          border-right: 1px solid rgba(0, 0, 0, 0.3);
          transition: background 0.1s;
        }

        .selector:last-child {
          border-right: none;
        }

        .view-selector button:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
