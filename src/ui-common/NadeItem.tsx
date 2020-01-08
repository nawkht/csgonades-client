import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { NadeLight, Status } from "../models/Nade/Nade";
import { GfycatThumbnail } from "./GfycatThumbnail";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { tickrateString } from "../models/Nade/NadeTickrate";
import Link from "next/link";
import { iconFromType, kFormatter } from "../utils/Common";
import { isLessThanDaysAgo } from "../utils/DateUtils";

interface Props {
  nade: NadeLight;
}

export const NadeItem: FC<Props> = ({ nade }) => {
  const { colors, durations, uiDimensions, isMobile } = useTheme();
  const title = nade.title || "No title...";

  const nadeBoxClassName = nadeStatusToClassName(nade.status);
  const iconUrl = iconFromType(nade.type);
  const isNew = isLessThanDaysAgo(nade.createdAt, 3);

  return (
    <>
      <Link href={`/nades?id=${nade.id}`} as={`/nades/${nade.id}`}>
        <a className={nadeBoxClassName} style={{ display: "inline-block" }}>
          <div className="title">
            <img
              className="nade-type-icon"
              src={iconUrl}
              alt={`nade icon ${nade.type}`}
            />{" "}
            <span className="title-text">{title}</span>
          </div>
          <div className="video">
            <GfycatThumbnail nade={nade} />
          </div>
          <div className="stats">
            <div className="stat">
              <Icon name="eye" size="small" />
              <span className="icon-text">{kFormatter(nade.viewCount)}</span>
            </div>

            {nade.tickrate && nade.tickrate !== "any" && (
              <div className="stat tick">
                <Icon name="code" size="small" />
                <span className="icon-text">
                  {tickrateString(nade.tickrate)}
                </span>
              </div>
            )}

            <div className="stat">
              <span className="new-badge">NEW</span>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: #fff;
          width: 100%;
          border: ${isMobile ? 0 : 1}px solid ${colors.PRIMARY_BORDER};
          border-radius: ${isMobile ? 0 : uiDimensions.BORDER_RADIUS};
          cursor: pointer;
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${durations.transition}s;
          overflow: hidden;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
        }

        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.PRIMARY};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          padding: 3px 6px 3px 9px;
          color: #444;
          align-items: center;
        }

        .stat {
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .stat .icon-text {
          font-size: 0.75em;
        }

        .tick {
          color: ${colors.PRIMARY};
        }

        .new-badge {
          font-size: 0.6em;
          border-radius: 4px;
          padding: 3px;
          border: 1px solid ${colors.SUCCESS};
          color: ${colors.SUCCESS};
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
