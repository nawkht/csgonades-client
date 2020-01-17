import { FC } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { toastSelector } from "../../store/ToastStore/ToastSelectors";
import { NotificationItem } from "./NotificationItem";
export const Notifications: FC = () => {
  const { uiDimensions, layers } = useTheme();
  const toasts = useSelector(toastSelector);

  return (
    <>
      <div className="notification-container">
        {toasts.map(toast => (
          <NotificationItem key={toast.id} notification={toast} />
        ))}
      </div>
      <style jsx>{`
        .notification-container {
          position: fixed;
          bottom: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          right: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          z-index: ${layers.MODAL};
          display: flex;
          flex-direction: column;
          flex-basis: fit-content;
          align-items: flex-end;
        }
      `}</style>
    </>
  );
};
