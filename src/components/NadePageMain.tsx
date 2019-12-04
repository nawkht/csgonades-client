import { Nade } from "../models/Nade";
import { CommentList } from "./CommentsList";
import { NadeDescription } from "./NadeDescription";
import { GfycatPlayerContrainer } from "./nadepage/GfycatPlayerContainer";

type Props = {
  nade: Nade;
};

const NadePageMain: React.FC<Props> = ({ nade }) => {
  function onSaveGfycat(gfyID: string) {
    console.log("Saved gfyid", gfyID);
  }

  return (
    <>
      <GfycatPlayerContrainer gfyData={nade.gfycat} onSave={onSaveGfycat} />
      <NadeDescription />
      <CommentList nadeId={nade.id} />
    </>
  );
};

export { NadePageMain };
