import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  onClick: () => void;
  allowEdit: boolean;
  offsetTop?: number;
  offsetRight?: number;
};

export const EditButton: FC<Props> = ({
  children,
  onClick,
  allowEdit,
  offsetRight,
  offsetTop,
}) => {
  const { colors } = useTheme();

  if (!allowEdit) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="edit-container">
        <div className="edit-btn-wrap">
          <button className="edit" onClick={onClick}>
            <FaEdit style={{ position: "relative", top: -2 }} />
            <span>EDIT</span>
          </button>
        </div>
        {children}
      </div>

      <style jsx>{`
        .edit-container {
          position: relative;
        }

        .edit-container:hover .edit-btn-wrap {
          opacity: 1;
        }

        .edit-btn-wrap {
          position: absolute;
          top: ${offsetTop ? `${offsetTop}px` : 0};
          right: ${offsetRight ? `${offsetRight}px` : 0};
          opacity: 0;
          transition: opacity 0.1s;
        }

        .edit {
          cursor: pointer;
          outline: none;
          border: none;
          appearance: none;
          background: ${colors.PRIMARY};
          opacity: 0.9;
          color: white;
          padding: 5px;
          border-radius: 5px;
          padding: 6px 12px;
          margin-right: 5px;
          margin-top: 5px;
          display: flex;
          align-items: center;
        }

        .edit span {
          margin-left: 5px;
        }
      `}</style>
    </>
  );
};
