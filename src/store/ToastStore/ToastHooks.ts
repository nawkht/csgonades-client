import { useDispatch } from "react-redux";
import { removeNotificationAction } from "./ToastActions";

export const useDismissToast = () => {
  const dispatch = useDispatch();

  return (id: string) => {
    dispatch(removeNotificationAction(id));
  };
};
