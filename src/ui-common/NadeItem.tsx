import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { NadeLight } from "../models/Nade";
import { Colors } from "../../constants/colors";
import { GfycatThumbnail } from "./GfycatThumbnail";

interface Props {
  nade: NadeLight;
  onClick: (id: string) => void;
}

const NadeItem: FC<Props> = ({ nade, onClick }) => {
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
            imageUrl={nade.images.thumbnailUrl}
            gfyUrl={nade.gfycat.smallVideoUrl}
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
          width: 220px;
          margin-right: 16px;
          margin-bottom: 16px;
          border: 1px solid ${Colors.PRIMARY_BORDER};
          border-radius: 4px;
          cursor: pointer;
          transform: scale(1);
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
          transform: scale(1.005);
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
          border-top: 1px solid ${Colors.PRIMARY_BORDER};
          border-bottom: 1px solid ${Colors.PRIMARY_BORDER};
          margin-right: 1px;
          margin-left: 1px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export { NadeItem };