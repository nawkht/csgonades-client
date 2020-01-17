import { useDispatch, useSelector } from "react-redux";
import { TournamentCreateDTO } from "../../models/Tournament";
import { tournamentSelector } from "./TournamentSelectors";
import { fetchTournamentsThunk, saveTournamentThunk } from "./TournamentThunks";

export const useTournaments = () => {
  const dispatch = useDispatch();
  const tournaments = useSelector(tournamentSelector);

  function fetchTournaments() {
    dispatch(fetchTournamentsThunk());
  }

  function saveTournament(tournament: TournamentCreateDTO) {
    dispatch(saveTournamentThunk(tournament));
  }

  return {
    tournaments,
    fetchTournaments,
    saveTournament
  };
};
