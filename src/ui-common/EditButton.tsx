import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

type Props = {
  isEditing: boolean;
  onClick: () => void;
};

export const EditButton: FC<Props> = ({ onClick, isEditing }) => {
  const { colors, durations, layers } = useTheme();

  if (isEditing) {
    return null;
  }

  return (
    <>
      <div className="edit-wrapper" onClick={onClick}>
        <Icon name="pencil alternate" /> EDIT
      </div>
      <style jsx>{`
        .edit-wrapper {
          padding: 3px 6px 3px 3px;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8em;
          background: ${colors.PRIMARY_75_PERCENT};
          color: white;
          z-index: ${layers.UNDER_UI};
          transition: background ${durations.transition}s;
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
