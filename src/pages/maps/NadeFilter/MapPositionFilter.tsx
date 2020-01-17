import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTryShowCoordTip } from "../../../store/NotificationStore/NotificationHooks";
import { Tip } from "../../../ui-common/Tip";

type Props = {
  map: CsgoMap;
};

export const MapPositionFilter: FC<Props> = ({ map }) => {
  const { toggleMapPositionModal, coords } = useNadeFilter();
  const { displayCoordsTip, onCloseCoordsTip } = useTryShowCoordTip();

  const hasCoordsSelected = !!coords;

  const className = hasCoordsSelected
    ? "nade-position-filter active"
    : "nade-position-filter";

  function onShowMap() {
    toggleMapPositionModal(true);
  }

  return (
    <>
      <Tip visisble={displayCoordsTip} onClick={onCloseCoordsTip}>
        <div className={className} onClick={onShowMap}>
          <div className={"position-filter"}>
            <span>MAP</span>
            <Icon name="location arrow" />
          </div>
        </div>
      </Tip>
      <style jsx>{`
        .nade-position-filter {
          background: #e0e1e2;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-right: 6px;
          transition: background 0.2s;
        }

        .nade-position-filter:hover {
          background: #c0c1c2;
        }

        .position-filter {
          padding: 12px;
          cursor: pointer;
        }
        .position-filter span {
          margin-right: 6px;
        }

        .active {
          background: #c0c1c2;
        }
      `}</style>
    </>
  );
};
