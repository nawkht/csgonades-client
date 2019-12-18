import { FC, useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDescriptionTextArea } from "./NadeDescriptionTextArea";

type Props = {
  onSave: (description: string) => void;
  onCancel: () => void;
  description: string;
};

export const NadeDescriptionEditor: FC<Props> = ({
  description,
  onCancel,
  onSave
}) => {
  const [descValue, setDescValue] = useState(description);

  function onSaveDescription() {
    onSave(descValue);
  }

  return (
    <Tab
      panes={[
        {
          menuItem: "Edit",
          render: () => (
            <Tab.Pane>
              <NadeDescriptionTextArea
                description={descValue}
                onDescriptionChange={setDescValue}
              />

              <Button onClick={onCancel}>Cancel</Button>
              <Button onClick={onSaveDescription} positive>
                Save
              </Button>
            </Tab.Pane>
          )
        },
        {
          menuItem: "Preview",
          render: () => (
            <Tab.Pane>
              <NadeDescriptionDisplay value={descValue} />
            </Tab.Pane>
          )
        }
      ]}
    />
  );
};
