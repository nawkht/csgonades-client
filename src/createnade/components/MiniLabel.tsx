import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  value: string;
};

export const MiniLabel: FC<Props> = ({ value }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="label">{value}</div>
      <style jsx>{`
        .label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          text-transform: uppercase;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
