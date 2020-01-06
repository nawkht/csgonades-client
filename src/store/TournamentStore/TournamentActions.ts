import { Tournament } from "../../models/Tournament";

type AddTournaments = {
  type: "@@tournament/ADD_LIST";
  tournaments: Tournament[];
};

export type TournamentActions = AddTournaments;

export const addTournamentsAction = (
  tournaments: Tournament[]
): AddTournaments => ({
  type: "@@tournament/ADD_LIST",
  tournaments
});
