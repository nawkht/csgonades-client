import { AppState } from "..";

export const tournamentSelector = (state: AppState) => {
  return state.tournamentStore.tournaments;
};
