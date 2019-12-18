import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { VideoPlayer } from "./VideoPlayer";
import { Nade } from "../models/Nade";
import { Colors } from "../../constants/colors";

interface Props {
  nade: Nade;
  onClick: (id: string) => void;
}

const NadeItem: FC<Props> = ({ nade, onClick }) => {
  return (
    <>
      <div
        onClick={() => onClick(nade.id)}
        className="nadebox"
        style={{ display: "inline-block" }}
      >
        <div className="title">{nade.title}</div>
        <div className="video">
          <VideoPlayer
            gfyVideoUrl={nade.gfycat.smallVideoUrl}
            id={nade.gfycat.gfyId}
            poster={nade.images.thumbnail}
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
        }

        .title {
          padding: 6px 12px;
          text-align: center;
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
      `}</style>
    </>
  );
};

export { NadeItem };
