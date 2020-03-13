import { FC } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const Hamburger: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { isNavOpen, toggleNav } = useNavigation();

  return (
    <>
      <div className="hamburger" onClick={toggleNav}>
        {isNavOpen && <FaTimes />}
        {!isNavOpen && <FaBars />}
      </div>
      <style jsx>{`
        .hamburger {
          margin-right: 18px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
