import { useDispatch, useSelector } from "react-redux";
import { User, UserUpdateDTO } from "../../models/User";
import {
  setViewingUserAction,
  startEditingUserAction,
  stopEditingUserAction
} from "./UsersActions";
import {
  viewingUserSelector,
  isEditingUserSelector,
  userNadesSelector,
  userErrorSelector,
  isUpdatingUserSelector
} from "./UsersSelectors";
import { updateUserThunk } from "./UsersThunks";

export const useUsersActions = () => {
  const dispatch = useDispatch();

  const setViewingUser = (user: User) => dispatch(setViewingUserAction(user));
  const startEditingUser = () => dispatch(startEditingUserAction());
  const stopEditingUser = () => dispatch(stopEditingUserAction());
  const updateUser = (updatedFields: UserUpdateDTO) =>
    dispatch(updateUserThunk(updatedFields));

  return {
    setViewingUser,
    startEditingUser,
    stopEditingUser,
    updateUser
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
