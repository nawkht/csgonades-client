import { Header, Icon, Button } from "semantic-ui-react";
import { useState, FC } from "react";
import { NewNadeImageModal } from "./NewNadeImageModal";
import { useNewNade } from "../../../store/NewNadeStore/NewNadeHooks";

export const AddImageContainer: FC = () => {
  const { addImage, imageData } = useNewNade();
  const [isImageModalVisisble, setIsImageModalVisisble] = useState(false);

  return (
    <>
      {!!imageData && (
        <>
          <img src={imageData} alt="result image" />
          <Button primary onClick={() => setIsImageModalVisisble(true)}>
            Edit
          </Button>
        </>
      )}
      {!imageData && (
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
        setBase64Image={addImage}
      />
    </>
  );
};
