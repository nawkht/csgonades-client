import { FC } from "react";
import { FaPenFancy } from "react-icons/fa";
import { AnimationTimings } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  isEditing: boolean;
  onClick: () => void;
};

export const EditButton: FC<Props> = ({ onClick, isEditing }) => {
  const { colors } = useTheme();

  if (isEditing) {
    return null;
  }

  return (
    <>
      <div className="edit-wrapper" onClick={onClick}>
        <FaPenFancy /> EDIT
      </div>
      <style jsx>{`
        .edit-wrapper {
          padding: 3px 6px 3px 3px;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8em;
          background: ${colors.PRIMARY};
          color: white;
          transition: background ${AnimationTimings.fast}s;
          display: flex;
          align-content: center;
        }

        .edit-wrapper:hover {
          background: ${colors.PRIMARY};
        }
      `}</style>
    </>
  );
};
