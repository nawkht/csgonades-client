import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { NadeLight } from "../models/Nade";
import { GfycatThumbnail } from "./GfycatThumbnail";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

interface Props {
  nade: NadeLight;
  onClick: (id: string) => void;
}

const NadeItem: FC<Props> = ({ nade, onClick }) => {
  const { colors, isMobile, durations } = useTheme();
  const title = nade.title || "No title...";

  return (
    <>
      <div
        onClick={() => onClick(nade.id)}
        className="nadebox"
        style={{ display: "inline-block" }}
      >
        <div className="title">{title}</div>
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
        </div>
      </div>
      <style jsx>{`
        .nadebox {
          background: #fff;
          width: ${isMobile ? "100%" : "220px"};
          margin-right: ${isMobile ? 0 : 16}px;
          margin-bottom: 16px;
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow ${durations.transition}s;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }

        .title {
          padding: 6px 12px;
          text-align: center;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stats {
          padding: 3px 6px;
        }

        .stat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .stat .icon-text {
          font-size: 0.75em;
        }

        .video {
          border-top: 1px solid ${colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          margin-right: 1px;
          margin-left: 1px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export { NadeItem };
