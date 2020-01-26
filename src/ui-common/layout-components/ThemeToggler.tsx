import { FC } from "react";
import "react-toggle/style.css";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NightDayToggle } from "./NightDayToggle";

type Props = {};

export const ThemeToggler: FC<Props> = ({}) => {
  const { toggleTheme, theme } = useTheme();

  const checked = theme === "dark";

  return (
    <>
      <div className="darkmode-toggle">
        <NightDayToggle checked={checked} onChange={toggleTheme} />
      </div>
      <style jsx>{`
        .darkmode-toggle {
          display: flex;
          justify-content: space-around;
          padding-top: 5px;
        }
      `}</style>
      <style jsx global>{`
        .react-toggle-track {
          background: #545454 !important;
        }
      `}</style>
    </>
  );
};
