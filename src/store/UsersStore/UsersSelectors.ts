import { AppState } from "..";

export const isEditingUserSelector = (state: AppState) => {
  return state.usersStore.isEditing;
};

export const viewingUserSelector = (state: AppState) => {
  return state.usersStore.viewingUser;
};

export const userNadesSelector = (state: AppState) => {
  return state.usersStore.userNades;
};

export const userErrorSelector = (state: AppState) => {
  return state.usersStore.error;
};

export const isUpdatingUserSelector = (state: AppState) => {
  return state.usersStore.isLoading;
};
