import { FC, memo } from "react";

import { GfycatIframe } from "./components/GfycatIframe";

type Props = {
  gfyId: string;
};

export const NadeVideoContainer: FC<Props> = memo(({ gfyId }) => {
  return <GfycatIframe gfyId={gfyId} />;
});
