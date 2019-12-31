import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { NadeLight, Status } from "../models/Nade/Nade";
import { GfycatThumbnail } from "./GfycatThumbnail";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { tickrateString } from "../models/Nade/NadeTickrate";
import Link from "next/link";
import { iconFromType } from "../utils/Common";

interface Props {
  nade: NadeLight;
  itemWidth: number;
}

export const NadeItem: FC<Props> = ({ nade, itemWidth }) => {
  const { colors, durations, uiDimensions, isMobile } = useTheme();
  const title = nade.title || "No title...";

  const nadeBoxClassName = nadeStatusToClassName(nade.status);
  const iconUrl = iconFromType(nade.type);

  return (
    <>
      <Link href={`/nades?id=${nade.id}`} as={`/nades/${nade.id}`}>
        <a className={nadeBoxClassName} style={{ display: "inline-block" }}>
          <div className="title">
            <img className="nade-type-icon" src={iconUrl} /> {title}
          </div>
          <div className="video">
            <GfycatThumbnail
              imageUrl={nade.images?.thumbnailUrl}
              gfyUrl={nade.gfycat?.smallVideoUrl}
            />
          </div>
          <div className="stats">
            <div className="stat">
              <Icon name="eye" size="small" />
              <span className="icon-text">{nade.stats.views}</span>
            </div>
            {nade.tickrate && nade.tickrate !== "any" && (
              <div className="stat tick">
                <Icon name="code" size="small" />
                <span className="icon-text">
                  {tickrateString(nade.tickrate)}
                </span>
              </div>
            )}
          </div>
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: #fff;
          width: ${itemWidth}px;
          border: ${isMobile ? 0 : 1}px solid ${colors.PRIMARY_BORDER};
          border-radius: ${isMobile ? 0 : 3}px;
          cursor: pointer;
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${durations.transition}s;
          margin: ${uiDimensions.INNER_GUTTER_SIZE / 2}px;
          overflow: hidden;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
        }

        .nadebox:hover .title {
          background: ${colors.PRIMARY};
        }

        .title {
          padding: 6px 12px;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: ${colors.PRIMARY_90_PERCENT};
          color: white;
          transition: background ${durations.transition}s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${uiDimensions.PADDING_SMALL}px;
        }

        .pending-nade .title {
          background: ${colors.WARNING_90};
        }

        .pending-nade:hover .title {
          background: ${colors.WARNING};
        }

        .declined-nade .title {
          background: ${colors.ERROR_90};
        }

        .declined-nade:hover .title {
          background: ${colors.ERROR};
        }

        .stats {
          display: flex;
          padding: 3px;
          justify-content: space-between;
          color: #444;
        }

        .stat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

        .stat .icon-text {
          font-size: 0.75em;
        }

        .tick {
          color: ${colors.PRIMARY};
        }

        .video {
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

function nadeStatusToClassName(status: Status) {
  switch (status) {
    case "pending":
      return "nadebox pending-nade";
    case "declined":
      return "nadebox declined-nade";
    default:
      return "nadebox";
  }
}
