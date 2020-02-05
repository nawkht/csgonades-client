import { AppState } from "..";

export const tournamentSelector = (state: AppState) =>
  state.tournamentStore.tournaments;
