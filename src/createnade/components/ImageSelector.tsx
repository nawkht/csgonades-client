import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const ImageSelector: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <MiniLabel value="Result image" />
      <button className="image-selector">SET IMAGE</button>
      <style jsx>{`
        .image-selector {
          width: 100%;
          background: ${colors.filterBg};
          color: white;
          border: none;
          outline: none;
          height: 41px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 14px;
          cursor: pointer;
        }

        .image-selector:hover {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
