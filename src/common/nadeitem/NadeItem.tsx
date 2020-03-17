import { FC, memo } from "react";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { GfycatThumbnail } from "./GfycatThumbnail";
import { NadeItemTitle } from "./NadeItemTitle";
import { NadeStats } from "./NadeStats";
import { PageLink } from "../PageLink";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItem: FC<Props> = memo(({ nade, onItemClick }) => {
  const { colors } = useTheme();

  const urlIdOrSlug = nade.slug || nade.id;

  return (
    <>
      <PageLink href={"/nades/[nade]"} as={`/nades/${urlIdOrSlug}`}>
        <div
          className={"nadebox"}
          style={{ display: "inline-block" }}
          onClick={onItemClick}
        >
          <NadeItemTitle nade={nade} />
          <div className="video">
            <GfycatThumbnail nade={nade} />
          </div>
          <NadeStats nade={nade} />
        </div>
      </PageLink>
      <style jsx>{`
        .nadebox {
          background: ${colors.DP01};
          border-radius: ${Dimensions.BORDER_RADIUS};
          cursor: pointer;
          box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${AnimationTimings.fast}s;
          overflow: hidden;
          width: 100%;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
        }

        .video {
          overflow: hidden;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nadebox {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
});
