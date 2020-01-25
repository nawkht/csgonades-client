import { useState } from "react";
import { Button, Input, Message } from "semantic-ui-react";
import { useNewNade } from "../../store/NewNadeStore/NewNadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const AddGfycat = () => {
  const { colors } = useTheme();
  const { addGfycat, loading, gfyData } = useNewNade();
  const [gfyValue, setGfyValue] = useState(gfyData?.gfyId || "");

  return (
    <>
      <div className="add-gfycat">
        <h2>Gfycat</h2>
        <Message info>
          <h3>Important</h3>
          <p>Hide your HUD while recording the throw:</p>
          <code>sv_cheats 1; cl_draw_only_deathnotices 1</code>
        </Message>
        <div className="input">
          <Input
            fluid
            label="Gfycat Url"
            loading={loading}
            value={gfyValue}
            onChange={e => {
              setGfyValue(e.target.value);
            }}
          />
        </div>

        <Button positive loading={loading} onClick={() => addGfycat(gfyValue)}>
          Verify
        </Button>
      </div>
      <style jsx>{`
        h2 {
          color: ${colors.TEXT};
        }

        .input {
          max-width: 500px;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
};
