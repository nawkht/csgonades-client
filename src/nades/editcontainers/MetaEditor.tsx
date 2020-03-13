import { FC, useState } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { CSGNModal } from "../../common/CSGNModal";
import { CsgoMap, nadeMapOptions } from "../../models/Nade/CsGoMap";
import { Nade } from "../../models/Nade/Nade";
import { Movement, nadeMovementOptions } from "../../models/Nade/NadeMovement";
import { nadeTickrateOptions, Tickrate } from "../../models/Nade/NadeTickrate";
import { NadeType, nadeTypeOptions } from "../../models/Nade/NadeType";
import { nadeTechniqueOptions, Technique } from "../../models/Nade/Technique";
import { useUpdateNade } from "../../store/NadeStore/hooks/useUpdateNade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  visisble: boolean;
  nade: Nade;
  onDismiss: () => void;
};

export const MetaEditor: FC<Props> = ({ nade, onDismiss, visisble }) => {
  const { colors } = useTheme();
  const updateNade = useUpdateNade();
  const [type, setType] = useState(nade.type);
  const [tickrate, setTickrate] = useState(nade.tickrate);
  const [map, setMap] = useState(nade.map);
  const [movement, setMovement] = useState(nade.movement);
  const [technique, setTechnique] = useState(nade.technique);

  const showTickrate = technique === "jumpthrow";

  function onNadeTypeChange(_: any, data: DropdownProps) {
    const newNadeType = data.value as NadeType;
    setType(newNadeType);
  }

  function onNadeTickrateChange(_: any, data: DropdownProps) {
    const newtickrate = data.value as Tickrate;
    setTickrate(newtickrate);
  }

  function onMapChange(_: any, data: DropdownProps) {
    const selectedMap = data.value as CsgoMap;
    setMap(selectedMap);
  }

  function onMovementChange(_: any, data: DropdownProps) {
    const selectedMap = data.value as Movement;
    setMovement(selectedMap);
  }

  function onTechniqueChange(_: any, data: DropdownProps) {
    const selectedTechnique = data.value as Technique;
    setTechnique(selectedTechnique);
  }

  function onSave() {
    updateNade(nade.id, {
      technique,
      map,
      movement,
      tickrate,
      type,
    });
    onDismiss();
  }

  return (
    <>
      <CSGNModal title="Edit metadata" onDismiss={onDismiss} visible={visisble}>
        <div className="meta-editor">
          <div className="meta">
            <span>Map</span>
            <Dropdown
              selection
              placeholder="Select..."
              value={map}
              onChange={onMapChange}
              options={nadeMapOptions()}
            />
          </div>

          <div className="meta">
            <span>Type</span>
            <Dropdown
              selection
              placeholder="Select..."
              value={type}
              onChange={onNadeTypeChange}
              options={nadeTypeOptions()}
            />
          </div>

          <div className="meta">
            <span>Movement</span>
            <Dropdown
              selection
              placeholder="Select..."
              value={movement}
              onChange={onMovementChange}
              options={nadeMovementOptions()}
            />
          </div>

          <div className="meta">
            <span>Technique</span>
            <Dropdown
              selection
              placeholder="Select..."
              value={technique}
              onChange={onTechniqueChange}
              options={nadeTechniqueOptions()}
            />
          </div>

          {showTickrate && (
            <div className="meta">
              <span>Tickrate</span>
              <Dropdown
                selection
                placeholder="Select..."
                value={tickrate}
                onChange={onNadeTickrateChange}
                options={nadeTickrateOptions()}
              />
            </div>
          )}

          <button className="submit-btn" onClick={onSave}>
            Save
          </button>
        </div>
      </CSGNModal>
      <style jsx>{`
        .meta-editor {
          min-width: 300px;
        }

        .submit-btn {
          border: none;
          background: ${colors.PRIMARY};
          color: white;
          margin-top: 15px;
          padding: 10px 20px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
        }

        .meta {
          margin-bottom: 10px;
          padding-bottom: 10px;
        }

        .meta span {
          display: block;
          min-width: 200px;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};
