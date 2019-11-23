import { Header, Icon, Button } from "semantic-ui-react";

export const NewNadeImage = () => {
  return (
    <>
      <Header icon>
        <Icon name="image" />
        Result image
      </Header>
      <br />
      <Button primary>Add</Button>
    </>
  );
};
