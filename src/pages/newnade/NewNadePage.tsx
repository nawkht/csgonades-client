import { FC } from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import { useNewNade } from "../../store/NewNadeStore/NewNadeHooks";
import { Layout } from "../../ui-common/layout/layout";
import { AddGfyContainer } from "./GfyModal/AddGfyContainer";
import { AddImageContainer } from "./ImageModal/AddImageContainer";

export const NewNadePage: FC = () => {
  const { gfyData, imageData, submit, loadingSubmit } = useNewNade();

  const cantSumbit = !gfyData || !imageData;

  return (
    <Layout title="New nade" canonical="/newnade">
      <div className="nade-new-container">
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
