import { useEffect, useState } from "react";
import { Button, Input, Message } from "semantic-ui-react";
import { useNewNade } from "../../../store/NewNadeStore/NewNadeHooks";
import { CSGNModal } from "../../../ui-common/CSGNModal";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const NewNadeGfycatModal = ({ onDismiss, visible }: Props) => {
  const { gfyData, addGfycat, gfyIsLoading, gfyError } = useNewNade();
  const [gfycatValue, setGfycatValue] = useState("");

  useEffect(() => {
    if (gfyData && !gfyIsLoading && !gfyError) {
      onDismiss();
    }
  }, [gfyData, gfyIsLoading, gfyError]);

  function validateGfycat() {
    setGfycatValue(gfycatValue);
    addGfycat(gfycatValue);
  }

  return (
    <>
      <CSGNModal
        visible={visible}
        onDismiss={onDismiss}
        title="Add gfycat video"
      >
        <Input
          fluid
          placeholder="Gfycat url or id"
          value={gfycatValue}
          onChange={e => {
            setGfycatValue(e.target.value);
          }}
        />

        {gfyError && (
          <Message negative>
            <Message.Header>Gfycat validation failed</Message.Header>
            <p>Can't find the gfycat or gfycat.com might be down.</p>
          </Message>
        )}

        <div className="btns">
          <div className="btn-cancel">
            <Button fluid onClick={onDismiss}>
              Cancel
            </Button>
          </div>
          <div className="btn-add">
            <Button
              fluid
              positive
              loading={gfyIsLoading}
              onClick={validateGfycat}
            >
              Add
            </Button>
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .btns {
          display: flex;
          max-width: 50%;
          margin: 0 auto;
          margin-top: 12px;
        }

        .btn-cancel {
          flex: 1;
          margin-right: 12px;
        }

        .btn-add {
          flex: 2;
        }
      `}</style>
    </>
  );
};
