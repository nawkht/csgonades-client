import { CSGNModal } from "../../ui-common/CSGNModal";
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
    const cleanGfyId = cleanGfycatUrl(gfycatValue);
    setGfycat(cleanGfyId);
    setGfycatValue(cleanGfyId);
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

function cleanGfycatUrl(gfycatIdOrUrl: string): string {
  const index = gfycatIdOrUrl.lastIndexOf("/");
  let gfyId: string | string[] = gfycatIdOrUrl.substr(index + 1);
  gfyId = gfyId.split("-");

  if (typeof gfyId === "string") {
    return gfyId;
  }

  return gfyId[0];
}
