import { FC } from "react";
import { FaMap } from "react-icons/fa";
import { useAnalytics } from "../../utils/Analytics";
import { useToggleMapview } from "../../store/MapStore/hooks/useToggleMapView";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const MapViewFilter: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { event } = useAnalytics();
  const { toggleMapViewVisibility } = useToggleMapview();

  function showMapView() {
    toggleMapViewVisibility();
    event({
      category: "MapView",
      action: "Show",
    });
  }

  return (
    <>
      <div className="mapview-filter-wrap">
        <div className="mapview-label">MAP</div>
        <button
          data-tip="custom show"
          data-event="click focus"
          className="filter-btn"
          onClick={showMapView}
        >
          <FaMap />
        </button>
      </div>
      <style jsx>{`
        .mapview-label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .filter-btn {
          border: none;
          outline: none;
          width: ${Dimensions.BUTTON_HEIGHT}px;
          height: ${Dimensions.BUTTON_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${colors.filterColor};
          font-size: ${Dimensions.BUTTON_HEIGHT / 2}px;
          cursor: pointer;
          border-radius: 5px;
          background: ${colors.filterBg};
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }

        .filter-btn:hover {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
