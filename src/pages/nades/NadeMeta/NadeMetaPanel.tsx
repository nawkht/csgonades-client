import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { Nade } from "../../../models/Nade/Nade";
import { useTheme } from "../../../store/LayoutStore/LayoutHooks";
import { useUpdateNade } from "../../../store/NadeStore/NadeHooks";
import { EditButton } from "../../../ui-common/EditButton";
import { NadeMapSiteValue } from "./NadeMapSiteValue";
import { NadeMapValue } from "./NadeMapValue";
import { NadeMovementValue } from "./NadeMovementValue";
import { NadeTechniqueValue } from "./NadeTechniqueValue";
import { NadeTickrateValue } from "./NadeTickrateValue";
import { NadeTypeValue } from "./NadeTypeValue";
import { NadeViewsValue } from "./NadeViewsValue";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeMetaPanel: FC<Props> = ({ nade, allowEdit }) => {
  const { colors, durations, uiDimensions } = useTheme();
  const updateNade = useUpdateNade();
  const [isEditing, setIsEditing] = useState(false);
  const [map, setMap] = useState(nade.map);
  const [movement, setMovement] = useState(nade.movement);
  const [tickrate, setTickrate] = useState(nade.tickrate);
  const [technique, setTechnique] = useState(nade.technique);
  const [mapSite, setMapSite] = useState(nade.mapSite);
  const [type, setType] = useState(nade.type);

  function updateNadeMeta() {
    updateNade(nade.id, {
      map,
      movement,
      tickrate,
      technique,
      mapSite,
      type
    });
    setIsEditing(false);
  }

  function cancelUpdate() {
    setIsEditing(false);
  }

  return (
    <>
      <div className="nade-meta-container">
        <div className="nade-meta-panel">
          <div className="nade-meta-item">
            <span className="map-meta-title">Type</span>
            <NadeTypeValue
              nadeType={type}
              isEditing={isEditing}
              onNadeTypeChange={setType}
            />
          </div>

          <div className="nade-meta-item">
            <span className="map-meta-title">Map</span>
            <NadeMapValue
              map={map}
              isEditing={isEditing}
              onMapChange={setMap}
            />
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
            <NadeViewsValue views={nade.viewCount} />
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
        {allowEdit && !isEditing && (
          <div className="edit-btn-container">
            <EditButton
              isEditing={isEditing}
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .nade-meta-container {
          position: relative;
        }

        .nade-meta-container:hover .edit-btn-container {
          opacity: 1;
        }

        .nade-meta-panel {
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-radius: ${uiDimensions.BORDER_RADIUS};
        }

        .nade-meta-item {
          background: white;
          padding: 12px 18px;
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
        }

        .nade-meta-item:last-child {
          border-bottom: 0;
        }

        .map-meta-title {
          display: inline-block;
          font-weight: 400;
          font-size: 0.9em;
          margin-right: 12px;
          min-width: 75px;
          border-right: 1px dotted ${colors.PRIMARY_BORDER};
        }

        .edit-btn-container {
          position: absolute;
          top: 100%;
          left: 0;
          padding-top: 6px;
          opacity: 0;
          transition: opacity ${durations.transition}s;
        }
      `}</style>
    </>
  );
};
