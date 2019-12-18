import { Nade } from "../../models/Nade";
import { NadeDescription } from "./NadeDescription/NadeDescription";
import { GfycatPlayerContrainer } from "../../ui-common/GfycatPlayerContainer";

type Props = {
  nade: Nade;
};

const NadePageMain: React.FC<Props> = ({ nade }) => {
  function onSaveGfycat(_: string) {}

  return (
    <>
      <GfycatPlayerContrainer gfyData={nade.gfycat} onSave={onSaveGfycat} />
      <NadeDescription nade={nade} />
    </>
  );
};

export { NadePageMain };
