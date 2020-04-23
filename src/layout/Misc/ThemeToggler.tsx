import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
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
          display: block;
          overflow: hidden;
          width: 45px;
          height: 26px;
          margin-left: 20px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .darkmode-toggle {
            overflow: visible;
          }
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
