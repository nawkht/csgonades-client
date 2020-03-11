import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const FilterBg: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="filter-bg">{children}</div>
      <style jsx>{`
        .filter-bg {
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          width: 45px;
          overflow: hidden;
          background: ${colors.filterBg};
        }
      `}</style>
    </>
  );
};
