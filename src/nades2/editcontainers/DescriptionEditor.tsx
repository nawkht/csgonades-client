import { FC } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { Nade } from "../../models/Nade/Nade";
import { NadeDescriptionEditor } from "../../nades/NadeDescription/NadeDescriptionEditor";
import { useCanEditNade, useUpdateNade } from "../../store/NadeStore/NadeHooks";

type Props = {
  visisble: boolean;
  nade: Nade;
  onDismiss: () => void;
};

export const DecriptionEditor: FC<Props> = ({ nade, onDismiss, visisble }) => {
  const updateNade = useUpdateNade();
  const allowEdit = useCanEditNade(nade);

  if (!allowEdit) {
    return null;
  }

  function onSave(desc: string) {
    updateNade(nade.id, { description: desc });
    onDismiss();
  }

  return (
    <>
      <CSGNModal
        title="Edit description"
        onDismiss={onDismiss}
        visible={visisble}
      >
        <NadeDescriptionEditor
          description={nade.description || ""}
          onCancel={onDismiss}
          onSave={onSave}
        />
      </CSGNModal>
      <style jsx>{``}</style>
    </>
  );
};
