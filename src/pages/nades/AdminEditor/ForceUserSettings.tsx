import { FC } from "react";
import { Button } from "semantic-ui-react";

type Props = {
  nadeId: string;
};

export const ForceUserSettings: FC = () => {
  return (
    <>
      <input placeholder="Steam id..." />
      <Button>Update</Button>
    </>
  );
};
