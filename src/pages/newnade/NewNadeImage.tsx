import { Header, Icon, Button } from "semantic-ui-react";
import { useState, FC } from "react";
import { NewNadeImageModal } from "./NewNadeImageModal";

type Props = {
  onSetImageBase64: (imageBase64: string) => void;
};

export const NewNadeImage: FC<Props> = ({ onSetImageBase64 }) => {
  const [isImageModalVisisble, setIsImageModalVisisble] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  function setImageBase64(imageBase64: string) {
    setCroppedImage(imageBase64);
    onSetImageBase64(imageBase64);
  }

  return (
    <>
      {croppedImage && (
        <>
          <img src={croppedImage} />
          <Button primary onClick={() => setIsImageModalVisisble(true)}>
            Edit
          </Button>
        </>
      )}
      {!croppedImage && (
        <>
          <Header icon>
            <Icon name="image" />
            Result image
          </Header>
          <br />
          <Button primary onClick={() => setIsImageModalVisisble(true)}>
            Add
          </Button>
        </>
      )}

      <NewNadeImageModal
        onDismiss={() => setIsImageModalVisisble(false)}
        visible={isImageModalVisisble}
        setBase64Image={setImageBase64}
      />
    </>
  );
};
