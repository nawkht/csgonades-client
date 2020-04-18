import { FC, memo, useState, useEffect } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Nade } from "../models/Nade/Nade";
import { PageLink } from "../common/PageLink";
import { NadeItemTitle } from "../common/nadeitem/NadeItemTitle";
import { GfycatThumbnail } from "../common/nadeitem/GfycatThumbnail";
import { NadeStats } from "../common/nadeitem/NadeStats";
import { Dimensions, AnimationTimings } from "../constants/Constants";
import { NadeApi } from "../api/NadeApi";

interface Props {
  nadeSlug: string;
}

export const BlogNadeItem: FC<Props> = memo(({ nadeSlug }) => {
  const { colors } = useTheme();

  const [nade, setNade] = useState<Nade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await NadeApi.byId(nadeSlug);
      if (res.isOk()) {
        setNade(res.value);
      }
      setLoading(false);
    })();
  }, [nadeSlug]);

  if (!nade || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageLink href={"/nades/[nade]"} as={`/nades/${nade?.slug}`}>
        <div className={"nadebox"} style={{ display: "inline-block" }}>
          <NadeItemTitle nade={{ ...nade }} />
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
          width: 350px;
          margin-bottom: 20px;
          margin-top: 20px;
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
