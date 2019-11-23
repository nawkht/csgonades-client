import { FC } from "react";

type Props = {
  title: string;
  visible: boolean;
  onDismiss: () => void;
};

export const CSGNModal: FC<Props> = ({
  children,
  title,
  visible,
  onDismiss
}) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="modal-bg" onClick={onDismiss}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-title">
            <h3>{title}</h3>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
        }
        .modal {
          background: red;
          align-self: center;
          background: #fff;
          border-radius: 3px;
          min-width: 50%;
        }
        .modal-title {
          padding: 18px;
          border-bottom: 1px solid #e6e6e6;
        }

        .modal-content {
          padding: 18px;
        }
      `}</style>
    </>
  );
};
