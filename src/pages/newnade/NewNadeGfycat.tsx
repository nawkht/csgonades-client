import { Header, Icon, Button } from "semantic-ui-react";
import { useState, FC } from "react";
import { GfycatVideoPlayer } from "../../ui-common/GfycatVideoPlayer";
import { NewNadeGfycatModal } from "./NewNadeGfycatModal";
import { GfyCatPlayer } from "../../ui-common/GfycatPlayer";

type Props = {
  onSetGfycat: (gfyId: string) => void;
};

export const NewNadeGfycat: FC<Props> = ({ onSetGfycat }) => {
  const [gfycatID, setGfycatID] = useState<string | null>(null);
  const [isGfycatModalVisisble, setIsGfycatModalVisisble] = useState(false);

  function applyGfycatID(gfyIdOrUrl: string) {
    const gfyId = cleanGfycatUrl(gfyIdOrUrl);
    setGfycatID(gfyId);
    onSetGfycat(gfyId);
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

function cleanGfycatUrl(gfycatIdOrUrl: string): string {
  const index = gfycatIdOrUrl.lastIndexOf("/");
  const gfyId = gfycatIdOrUrl.substr(index + 1);
  return gfyId;
}
