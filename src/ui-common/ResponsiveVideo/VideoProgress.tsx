import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  progress: number;
};

export const VideoProgress: FC<Props> = ({ progress }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="video-progress">
        <progress max="100" value={progress} />
      </div>
      <style jsx>{`
        progress {
          width: 100%;
          height: 5px;
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
