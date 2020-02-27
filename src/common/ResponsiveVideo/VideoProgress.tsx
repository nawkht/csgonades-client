import { FC, MouseEventHandler } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  progress: number;
  onProgressClick: (percentage: number) => void;
};

export const VideoProgress: FC<Props> = ({ progress, onProgressClick }) => {
  const { colors } = useTheme();

  const onProgressBarClick: MouseEventHandler<HTMLProgressElement> = e => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - bounds.left;
    const width = e.currentTarget.clientWidth;
    const percentage = (x * 100) / width;
    onProgressClick(percentage);
  };

  return (
    <>
      <div className="video-progress">
        <progress max="100" value={progress} onClick={onProgressBarClick} />
      </div>
      <style jsx>{`
        progress {
          cursor: pointer;
          width: 100%;
          height: 7px;
          -webkit-appearance: none;
          appearance: none;
          display: block;
          background: transparent;
        }

        progress[value] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: none;
        }

        progress[value]::-webkit-progress-bar {
          background-color: rgba(0, 0, 0, 0.5);
        }

        progress[value]::-webkit-progress-value {
          background: ${colors.PRIMARY};
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};
