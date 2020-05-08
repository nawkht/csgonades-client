import { FC, memo } from "react";

import { GfycatIframe } from "./components/GfycatIframe";

type Props = {
  gfyId: string;
};

export const NadeVideoContainer: FC<Props> = memo(({ gfyId }) => {
  console.log("> Render gfycat video");
  return <GfycatIframe gfyId={gfyId} />;
});
