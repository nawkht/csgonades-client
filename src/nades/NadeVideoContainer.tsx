import { FC } from "react";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { isMobile } from "react-device-detect";
import { Nade } from "../models/Nade/Nade";
import { GfycatIframe } from "./components/GfycatIframe";

type Props = {
  nade: Nade;
};

export const NadeVideoContainer: FC<Props> = ({ nade }) => {
  return <GfycatIframe nade={nade} />;

  return (
    <ResponsiveVideo
      gfyId={nade.gfycat.gfyId}
      hdUrL={nade.gfycat.largeVideoUrl}
      sdUrl={nade.gfycat.smallVideoUrl}
      hdUrlWebm={nade.gfycat.largeVideoWebm}
      poster={nade.images.thumbnailUrl}
      controls={isMobile ? "mobile" : "desktop"}
    />
  );
};
