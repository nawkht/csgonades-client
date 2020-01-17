import { FC, useState } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { useNewNade } from "../../../store/NewNadeStore/NewNadeHooks";
import { GfycatLargePlayer } from "../../../ui-common/GfycatLargePlayer";
import { NewNadeGfycatModal } from "./NewNadeGfycatModal";

export const AddGfyContainer: FC = () => {
  const { gfyData } = useNewNade();
  const [isGfycatModalVisisble, setIsGfycatModalVisisble] = useState(false);

  return (
    <>
      <div className="gfycat-container">
        {gfyData && (
          <>
            <GfycatLargePlayer gfyUrl={gfyData.largeVideoUrl} />
            <Button primary onClick={() => setIsGfycatModalVisisble(true)}>
              Edit
            </Button>
          </>
        )}
        {!gfyData && (
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
