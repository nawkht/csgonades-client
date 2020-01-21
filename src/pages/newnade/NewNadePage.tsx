import { FC } from "react";
import { Button, Divider, Grid, Message, Segment } from "semantic-ui-react";
import { useNewNade } from "../../store/NewNadeStore/NewNadeHooks";
import { Layout } from "../../ui-common/Layout";
import { AddGfyContainer } from "./GfyModal/AddGfyContainer";
import { AddImageContainer } from "./ImageModal/AddImageContainer";

export const NewNadePage: FC = () => {
  const { gfyData, imageData, submit, loadingSubmit } = useNewNade();

  const cantSumbit = !gfyData || !imageData;

  return (
    <Layout title="New nade" canonical="/newnade">
      <div className="nade-new-container">
        <Message info>
          <h2>Important</h2>
          <p>So you want to add a nade. Great!</p>
          <p>Follow these simple steps and it will look beautiful!</p>
          <h3>Recording</h3>
          <p>Hide your HUD while recording the throw:</p>
          <code>sv_cheats 1; cl_draw_only_deathnotices 1</code>
          <h3>Screenshot</h3>
          <p>Hide everything for the screenshot:</p>
          <code>
            sv_cheats 1; r_drawviewmodel 0; cl_draw_only_deathnotices 1
          </code>
        </Message>
        <h2>Add new nade</h2>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>And</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <AddGfyContainer />
              </Grid.Column>
              <Grid.Column>
                <AddImageContainer />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button
          disabled={cantSumbit || loadingSubmit}
          loading={loadingSubmit}
          color="green"
          onClick={submit}
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
