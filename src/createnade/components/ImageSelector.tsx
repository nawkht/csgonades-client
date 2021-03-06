import { FC } from "react";
import { MiniLabel } from "./MiniLabel";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  label: string;
  onClick: () => void;
  imageIsSet?: boolean;
  optional?: boolean;
};

export const ImageSelector: FC<Props> = ({
  onClick,
  imageIsSet,
  label,
  optional,
}) => {
  const { colors } = useTheme();

  const msgString = imageIsSet
    ? "CHANGE IMAGE (ONLY JPG)"
    : "SET IMAGE (ONLY JPG)";

  return (
    <>
      <MiniLabel value={label} optional={optional} />

      <button onClick={onClick} className="image-selector">
        {msgString}
      </button>
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
