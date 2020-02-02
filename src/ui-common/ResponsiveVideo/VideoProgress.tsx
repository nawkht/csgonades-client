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
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <style jsx>{`
        .progress {
          height: 5px;
          background: ${colors.PRIMARY};
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          transition: width 0.5s;
        }
      `}</style>
    </>
  );
};
