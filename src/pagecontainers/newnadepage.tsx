import { FC } from "react";
import { Layout } from "../components/layout/layout";
import { Button, Segment, Grid, Divider } from "semantic-ui-react";
import { NewNadeGfycat } from "../components/newnade/NewNadeGfycat";
import { NewNadeImage } from "../components/newnade/NewNadeImage";

const NewNadePage: FC = () => {
  return (
    <Layout>
      <div className="nade-new-container">
        <h2>Add new nade</h2>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>And</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <NewNadeGfycat />
              </Grid.Column>

              <Grid.Column>
                <NewNadeImage />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button disabled color="green">
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

export { NewNadePage };
