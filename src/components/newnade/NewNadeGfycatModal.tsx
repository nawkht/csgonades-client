import { CSGNModal } from "../CSGNModal";
import { Input, Button } from "semantic-ui-react";
import { useState } from "react";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  setGfycat: (gfycatId: string) => void;
};

export const NewNadeGfycatModal = ({
  onDismiss,
  visible,
  setGfycat
}: Props) => {
  const [isLoading] = useState(false);
  const [gfycatValue, setGfycatValue] = useState("");
  const [error] = useState(null);

  function validateGfycat() {
    // api call to validate
    setGfycat(gfycatValue);
    onDismiss();
  }

  return (
    <>
      <CSGNModal
        visible={visible}
        onDismiss={onDismiss}
        title="Add gfycat video"
      >
        <Input
          loading={isLoading}
          placeholder="Gfycat url or id"
          value={gfycatValue}
          onChange={e => {
            setGfycatValue(e.target.value);
          }}
        />
        <Button onClick={validateGfycat}>Add</Button>
        {error && <p>error</p>}
      </CSGNModal>
    </>
  );
};
