import { FC } from "react";
import { FaBars } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const Hamburger: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { toggleNav } = useNavigation();

  return (
    <>
      <div className="hamburger" onClick={toggleNav}>
        <FaBars />
      </div>
      <style jsx>{`
        .hamburger {
          margin-right: 18px;
          font-size: 24px;
          position: relative;
          top: 2px;
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
