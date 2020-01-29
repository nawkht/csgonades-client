import { FC } from "react";

type Props = {
  progress: number;
};

export const SeekBar: FC<Props> = ({ progress }) => {
  return (
    <>
      <div className="seek-bar">
        <div className="seek-progress" />
      </div>
      <style jsx>{`
        .seek-bar {
          background: rgba(0, 0, 0, 0.3);
          height: 4px;
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          z-index: 900;
          border-radius: 4px;
          overflow: hidden;
        }

        .seek-progress {
          background: rgba(255, 255, 255, 0.75);
          height: 4px;
          width: ${progress}%;
          transition: width 0.4s;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};
