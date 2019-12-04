import { CSGNModal } from "../CSGNModal";
import { ImageUploader } from "../ImageUploader";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  setBase64Image: (imageBase64: string) => void;
};

export const NewNadeImageModal = ({
  onDismiss,
  visible,
  setBase64Image
}: Props) => {
  function onImageCropped(base64image: string) {
    setBase64Image(base64image);
    onDismiss();
  }

  return (
    <>
      <CSGNModal visible={visible} onDismiss={onDismiss} title="Add image">
        <ImageUploader onImageCropped={onImageCropped} />
      </CSGNModal>
    </>
  );
};
