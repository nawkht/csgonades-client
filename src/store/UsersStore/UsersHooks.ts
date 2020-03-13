import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../models/User";
import {
  setViewingUserAction,
  startEditingUserAction,
  stopEditingUserAction,
} from "./UsersActions";
import {
  isEditingUserSelector,
  isUpdatingUserSelector,
  userErrorSelector,
  userNadesSelector,
  viewingUserSelector,
} from "./UsersSelectors";

export const useUsersActions = () => {
  const dispatch = useDispatch();

  const setViewingUser = useCallback(
    (user: User) => {
      dispatch(setViewingUserAction(user));
    },
    [dispatch]
  );

  const startEditingUser = useCallback(() => {
    dispatch(startEditingUserAction());
  }, [dispatch]);

  const stopEditingUser = useCallback(() => {
    dispatch(stopEditingUserAction());
  }, [dispatch]);

  return {
    setViewingUser,
    startEditingUser,
    stopEditingUser,
  };
};

export const useUsersState = () => {
  const user = useSelector(viewingUserSelector);
  const isEditing = useSelector(isEditingUserSelector);
  const nades = useSelector(userNadesSelector);
  const error = useSelector(userErrorSelector);
  const isUpdatingUser = useSelector(isUpdatingUserSelector);

  return { user, isEditing, nades, error, isUpdatingUser };
};
