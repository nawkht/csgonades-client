import { FC, useState } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { Button, Segment, Grid, Divider } from "semantic-ui-react";
import { NewNadeGfycat } from "./NewNadeGfycat";
import { NewNadeImage } from "./NewNadeImage";
import { NadeBody } from "../../models/Nade/Nade";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { useCreateNade } from "../../store/NadeStore/NadeHooks";
import { useIsLoadingNade } from "../../store/NadeStore/NadeSelectors";

export const NewNadePage: FC = () => {
  const isLoadingNade = useIsLoadingNade();
  const createNade = useCreateNade();
  const [gfyId, setGfyId] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const cantSumbit = !gfyId || !imageBase64;

  function onSetImageBase64(base64image: string) {
    GoogleAnalytics.event("New Nade", "Set image");
    setImageBase64(base64image);
  }

  function onSetGfycat(gfyId: string) {
    GoogleAnalytics.event("New Nade", "Set gfycat");
    setGfyId(gfyId);
  }

  async function onSumbitNade() {
    if (!gfyId || !imageBase64) {
      console.warn("Tried to submit with no gfyid or image");
      return;
    }

    const nadeBody: NadeBody = {
      gfycatIdOrUrl: gfyId,
      imageBase64: imageBase64
    };

    createNade(nadeBody);

    GoogleAnalytics.event("New Nade", "Submit");
  }

  return (
    <Layout>
      <div className="nade-new-container">
        <h2>Add new nade</h2>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>And</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <NewNadeGfycat onSetGfycat={onSetGfycat} />
              </Grid.Column>

              <Grid.Column>
                <NewNadeImage onSetImageBase64={onSetImageBase64} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button
          disabled={cantSumbit}
          loading={isLoadingNade}
          color="green"
          onClick={onSumbitNade}
        >
          Submit
        </Button>
      </div>

      <style jsx>
        {`
          .nade-new-container {
            margin: 18px;
          }
        `}
      </style>
    </Layout>
  );
};
