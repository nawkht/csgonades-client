import { Nade } from "../models/Nade";
import { GfycatPlayer } from "./nadepage/GfycatPlayer";
import { CommentList } from "./CommentsList";
import { NadeDescription } from "./NadeDescription";

type Props = {
  nade: Nade;
};

const NadePageMain: React.FC<Props> = ({ nade }) => {
  function onSaveGfycat(gfyID: string) {
    console.log("Saved gfyid", gfyID);
  }

  return (
    <>
      <GfycatPlayer gfyID={nade.gfyID} onSave={onSaveGfycat} />
      <NadeDescription />
      <CommentList nadeId={nade.id} />
    </>
  );
};

export { NadePageMain };
