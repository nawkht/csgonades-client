import { FC } from "react";
import { useSelector } from "react-redux";
import { Dimensions, LayerPosition } from "../../constants/Constants";
import { toastSelector } from "../../store/ToastStore/ToastSelectors";
import { ToastItem } from "./ToastItem";
export const ToastList: FC = () => {
  const toasts = useSelector(toastSelector);

  return (
    <>
      <div className="notification-container">
        {toasts.map(toast => (
          <ToastItem key={toast.id} notification={toast} />
        ))}
      </div>
      <style jsx>{`
        .notification-container {
          position: fixed;
          bottom: ${Dimensions.GUTTER_SIZE};
          right: ${Dimensions.GUTTER_SIZE};
          z-index: ${LayerPosition.MODAL};
          display: flex;
          flex-direction: column;
          flex-basis: fit-content;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
};
