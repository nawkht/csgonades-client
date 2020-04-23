import { FC, useState } from "react";
import { Button } from "semantic-ui-react";
import { MapCoordinates, Nade } from "../../models/Nade/Nade";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { useUpdateNade } from "../../store/NadeStore/hooks/useUpdateNade";
import { MapPositionModal } from "./MapPositionModal";

type Props = {
  nade: Nade;
};

const MapPositionEditor: FC<Props> = ({ nade }) => {
  const allowEdit = useCanEditNade(nade);
  const updateNade = useUpdateNade();

  const [showPositionEditor, setShowPositionEditor] = useState(false);

  const toggleEditor = () => {
    setShowPositionEditor(!showPositionEditor);
  };

  const onPositionSave = (coords: MapCoordinates) => {
    setShowPositionEditor(false);
    updateNade(nade.id, {
      mapEndCoord: coords,
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
          color="orange"
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
          max-width: 150px;
          margin: 0 auto;
          padding-bottom: 30px;
        }
      `}</style>
    </>
  );
};
export default MapPositionEditor;
