import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TournamentCreateDTO } from "../../models/Tournament";
import { tournamentSelector } from "./TournamentSelectors";
import { fetchTournamentsThunk, saveTournamentThunk } from "./TournamentThunks";

export const useTournaments = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(tournamentSelector);

  const fetchTournaments = useCallback(() => {
    dispatch(fetchTournamentsThunk());
  }, [dispatch]);

  const saveTournament = useCallback(
    (tournament: TournamentCreateDTO) => {
      dispatch(saveTournamentThunk(tournament));
    },
    [dispatch]
  );

  return {
    tournaments,
    fetchTournaments,
    saveTournament,
  };
};
