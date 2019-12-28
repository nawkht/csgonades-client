import { FC, useState } from "react";
import { Nade } from "../../../models/Nade";
import { Colors } from "../../../../constants/colors";
import { Icon } from "semantic-ui-react";
import { NadeMapValue } from "./NadeMapValue";
import { useUpdateNadeAction } from "../../../store/NadeStore/NadeActions";
import { NadeMovementValue } from "./NadeMovementValue";
import { NadeTickrateValue } from "./NadeTickrateValue";
import { NadeTechniqueValue } from "./NadeTechniqueValue";
import { NadeViewsValue } from "./NadeViewsValue";
import { NadeMapSiteValue } from "./NadeMapSiteValue";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeMetaPanel: FC<Props> = ({ nade, allowEdit }) => {
  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  const [map, setMap] = useState(nade.map);
  const [movement, setMovement] = useState(nade.movement);
  const [tickrate, setTickrate] = useState(nade.tickrate);
  const [technique, setTechnique] = useState(nade.technique);
  const [mapSite, setMapSite] = useState(nade.mapSite);

  function updateNadeMeta() {
    updateNade(nade.id, {
      map,
      movement,
      tickrate,
      technique,
      mapSite
    });
    setIsEditing(false);
  }

  function cancelUpdate() {
    setIsEditing(false);
  }

  return (
    <>
      <div className="nade-meta-panel">
        {allowEdit && !isEditing && (
          <div
            className="nade-meta-edit-container"
            onClick={() => setIsEditing(true)}
          >
            <Icon circular link name="pencil alternate" />
          </div>
        )}

        <div className="nade-meta-item">
          <span className="map-meta-title">Map</span>
          <NadeMapValue map={map} isEditing={isEditing} onMapChange={setMap} />
        </div>

        <div className="nade-meta-item">
          <span className="map-meta-title">Site</span>
          <NadeMapSiteValue
            mapSite={mapSite}
            isEditing={isEditing}
            onChange={setMapSite}
          />
        </div>

        <div className="nade-meta-item">
          <span className="map-meta-title">Movement</span>
          <NadeMovementValue
            isEditing={isEditing}
            movement={movement}
            onChange={setMovement}
          />
        </div>

        <div className="nade-meta-item">
          <span className="map-meta-title">Technique</span>
          <NadeTechniqueValue
            isEditing={isEditing}
            technique={technique}
            onChange={setTechnique}
          />
        </div>

        {technique === "jumpthrow" && (
          <div className="nade-meta-item">
            <span className="map-meta-title">Tickrate</span>
            <NadeTickrateValue
              isEditing={isEditing}
              tickrate={tickrate || "any"}
              onChange={setTickrate}
            />
          </div>
        )}

        <div className="nade-meta-item">
          <span className="map-meta-title">Views</span>
          <NadeViewsValue views={nade.stats.views} />
        </div>

        {isEditing && (
          <div className="nade-meta-edit-container">
            <span onClick={cancelUpdate}>
              <Icon circular link color="grey" name="cancel" />
            </span>
            <span onClick={updateNadeMeta}>
              <Icon inverted circular link color="olive" name="check" />
            </span>
          </div>
        )}
      </div>
      <style jsx>{`
        .nade-meta-panel {
          position: relative;
          border-top: 1px solid ${Colors.PRIMARY_BORDER};
          border-left: 1px solid ${Colors.PRIMARY_BORDER};
          border-right: 1px solid ${Colors.PRIMARY_BORDER};
          border-radius: 4px;
        }

        .nade-meta-item {
          background: white;
          padding: 12px 18px;
          border-bottom: 1px solid ${Colors.PRIMARY_BORDER};
        }

        .map-meta-title {
          display: inline-block;
          font-weight: bold;
          font-size: 0.9em;
          margin-right: 12px;
          min-width: 75px;
          border-right: 1px dotted ${Colors.PRIMARY_BORDER};
        }

        .nade-meta-edit-container {
          position: absolute;
          top: 100%;
          right: 0px;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
};
