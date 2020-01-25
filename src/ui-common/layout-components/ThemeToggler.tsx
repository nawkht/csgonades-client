import { FC } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const ThemeToggler: FC<Props> = ({}) => {
  const { toggleTheme, theme } = useTheme();

  const checked = theme === "dark";

  return (
    <>
      <div className="darkmode-toggle">
        <Toggle
          checked={checked}
          icons={{
            checked: <FiMoon style={{ color: "white", marginTop: -2 }} />,
            unchecked: <FiSun style={{ color: "yellow", marginTop: -2 }} />
          }}
          onChange={toggleTheme}
        />
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
