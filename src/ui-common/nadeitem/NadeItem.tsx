import Link from "next/link";
import { FC } from "react";
import { AnimationTimings, Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { GfycatThumbnail } from "../GfycatThumbnail";
import { NadeItemTitle } from "./NadeItemTitle";
import { NadeStats } from "./NadeStats";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItem: FC<Props> = ({ nade, onItemClick }) => {
  const { colors } = useTheme();

  return (
    <>
      <Link href={`/nades?id=${nade.id}`} as={`/nades/${nade.id}`}>
        <a
          className={"nadebox"}
          style={{ display: "inline-block" }}
          onClick={onItemClick}
        >
          <NadeItemTitle nade={nade} />
          <div className="video">
            <GfycatThumbnail nade={nade} />
          </div>
          <NadeStats nade={nade} />
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: ${colors.DP01};
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          cursor: pointer;
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${AnimationTimings.fast}s;
          overflow: hidden;
          width: 100%;
          max-width: 300px;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
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
};
