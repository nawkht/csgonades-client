import { FC, useState } from "react";
import ReactMde, { commands } from "react-mde";
import { Button } from "semantic-ui-react";
import Showdown from "showdown";

type Props = {
  onSave: (description: string) => void;
  onCancel: () => void;
  description: string;
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  simpleLineBreaks: true,
});

export const NadeDescriptionEditor: FC<Props> = ({
  description,
  onCancel,
  onSave,
}) => {
  const [descValue, setDescValue] = useState(description);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  function onSaveDescription() {
    onSave(descValue);
  }

  return (
    <>
      <div className="desc-editor">
        <ReactMde
          value={descValue}
          onChange={setDescValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          minEditorHeight={400}
          commands={[
            {
              commands: [
                commands.boldCommand,
                commands.italicCommand,
                commands.linkCommand,
                commands.unorderedListCommand,
              ],
            },
          ]}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSaveDescription}>Save</Button>
      </div>
      <style jsx>{`
        .desc-editor {
          width: 50vw;
          min-height: 500px;
        }
      `}</style>
    </>
  );
};
