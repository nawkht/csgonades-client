import { Header, Icon, Button } from "semantic-ui-react";
import { useState } from "react";
import { GfyCatPlayer } from "../nadepage/GfycatPlayer";
import { NewNadeGfycatModal } from "./NewNadeGfycatModal";

export const NewNadeGfycat = () => {
  const [gfycatID, setGfycatID] = useState<string | null>(null);
  const [isGfycatModalVisisble, setIsGfycatModalVisisble] = useState(false);

  function applyGfycatID(gfycatID: string) {
    setGfycatID(gfycatID);
  }

  return (
    <>
      <div className="gfycat-container">
        {gfycatID && (
          <>
            <GfyCatPlayer gfycatID={gfycatID} />
            <Button primary onClick={() => setIsGfycatModalVisisble(true)}>
              Edit
            </Button>
          </>
        )}
        {!gfycatID && (
          <>
            <Header icon>
              <Icon name="video" />
              Gfycat
            </Header>
            <br />
            <Button primary onClick={() => setIsGfycatModalVisisble(true)}>
              Add
            </Button>
          </>
        )}
        <NewNadeGfycatModal
          setGfycat={applyGfycatID}
          visible={isGfycatModalVisisble}
          onDismiss={() => setIsGfycatModalVisisble(false)}
        />
      </div>
      <style jsx>{`
        .gfycat-container {
          padding: 12px;
        }
      `}</style>
    </>
  );
};
