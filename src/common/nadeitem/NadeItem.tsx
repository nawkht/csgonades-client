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
          <NadeItemTitle
            type={nade.type}
            status={nade.status}
            title={nade.title}
          />
          <div className="video">
            <GfycatThumbnail
              nadeId={nade.id}
              smallVideoUrl={nade.gfycat.smallVideoUrl}
              thumbnailUrl={nade.images.thumbnailUrl}
              avgColor={nade.gfycat.avgColor}
              nadeSlug={nade.slug}
            />
          </div>
          <NadeStats
            commentCount={nade.commentCount}
            createdAt={nade.createdAt}
            favoriteCount={nade.favoriteCount}
            viewCount={nade.viewCount}
            isFavorited={nade.isFavorited}
            movement={nade.movement}
            technique={nade.technique}
            tickrate={nade.tickrate}
          />
        </div>
      </PageLink>
      <style jsx>{`
        .nadebox {
          background: ${colors.DP01};
          border-radius: ${Dimensions.BORDER_RADIUS};
          cursor: pointer;
          transition: box-shadow ${AnimationTimings.fast}s;
          overflow: hidden;
          width: 100%;
          border: 1px solid ${colors.BORDER};
        }

        .nadebox:hover {
          box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.05);
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
