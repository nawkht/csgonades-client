import { CSGNModal } from "../CSGNModal";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  setBase64Image: (image: string) => void;
};

export const NewNadeGfycatModal = ({
  onDismiss,
  visible,
  setBase64Image
}: Props) => {
  return (
    <>
      <CSGNModal
        visible={visible}
        onDismiss={onDismiss}
        title="Add image"
      ></CSGNModal>
    </>
  );
};
