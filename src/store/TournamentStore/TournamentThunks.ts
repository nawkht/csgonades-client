import { ReduxThunkAction } from "../StoreUtils/ThunkActionType";
import { tokenSelector } from "../AuthStore/AuthSelectors";
import { TournamentApi } from "../../api/TournamentApi";
import { addTournamentsAction } from "./TournamentActions";
import { TournamentCreateDTO } from "../../models/Tournament";

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
  return async (dispatch, getState) => {
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
