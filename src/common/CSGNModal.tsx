import { FC } from "react";
import { Dimensions, LayerPosition } from "../constants/Constants";

type Props = {
  title?: string;
  visible: boolean;
  onDismiss: () => void;
  empty?: boolean;
};

export const CSGNModal: FC<Props> = ({
  children,
  title,
  visible,
  onDismiss,
  empty,
}) => {
  if (!visible) {
    return null;
  }

  if (empty) {
    return (
      <>
        <div className="modal-bg" onClick={onDismiss}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
        <style jsx>{`
          .modal-bg {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: ${LayerPosition.MODAL};
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
          }

          .modal {
            align-self: center;
            border-radius: ${Dimensions.BORDER_RADIUS};
            min-width: 50%;
            max-width: 90vw;
            max-height: 90vh;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="modal-bg" onClick={onDismiss}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          {!!title && (
            <div className="modal-title">
              <h3>{title}</h3>
            </div>
          )}
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
          z-index: ${LayerPosition.MODAL};
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
        }

        .modal {
          background: red;
          align-self: center;
          background: #fff;
          border-radius: ${Dimensions.BORDER_RADIUS};
          min-width: 50%;
          max-width: 90vw;
          max-height: 90vh;
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
