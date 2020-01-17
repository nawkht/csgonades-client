import { FC, useState } from "react";
import { Button } from "semantic-ui-react";
import { MapCoordinates, Nade } from "../../../models/Nade/Nade";
import {
  useCanEditNade,
  useUpdateNade
} from "../../../store/NadeStore/NadeHooks";
import { MapPositionModal } from "./MapPositionModal";

type Props = {
  nade: Nade;
};

export const MapPositionEditor: FC<Props> = ({ nade }) => {
  const allowEdit = useCanEditNade(nade);
  const updateNade = useUpdateNade();

  const [showPositionEditor, setShowPositionEditor] = useState(false);

  const toggleEditor = () => {
    setShowPositionEditor(!showPositionEditor);
  };

  const onPositionSave = (coords: MapCoordinates) => {
    setShowPositionEditor(false);
    updateNade(nade.id, {
      mapEndCoord: coords
    });
  };

  if (!allowEdit || !nade.map) {
    return null;
  }

  return (
    <>
      <div className="position-btn">
        <Button
          fluid
          content="Set position"
          icon="location arrow"
          labelPosition="left"
          onClick={toggleEditor}
        />
      </div>
      <MapPositionModal
        onSave={onPositionSave}
        visible={showPositionEditor}
        map={nade.map}
        mapEndCoord={nade.mapEndCoord}
        onDismiss={toggleEditor}
      />
      <style jsx>{`
        .position-btn {
          margin-top: 40px;
        }
      `}</style>
    </>
  );
};
