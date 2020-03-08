import { TournamentApi } from "../../api/TournamentApi";
import { TournamentCreateDTO } from "../../models/Tournament";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { addTournamentsAction } from "./TournamentActions";

export const fetchTournamentsThunk = (): ReduxThunkAction => {
  return async dispatch => {
    const res = await TournamentApi.getAll();

    if (res.isErr()) {
      console.error(res.error);
      return;
    }

    dispatch(addTournamentsAction(res.value));
  };
};

export const saveTournamentThunk = (
  tournament: TournamentCreateDTO
): ReduxThunkAction => {
  return async (_, getState) => {
    const authToken = tokenSelector(getState());

    if (!authToken) {
      console.error("Save tournament missing token");
      return;
    }

    const res = await TournamentApi.save(tournament, authToken);

    if (res.isErr()) {
      console.error(res.error);
      return;
    }
  };
};
