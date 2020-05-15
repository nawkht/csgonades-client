import { AppState } from "..";

export const userVotesSelector = (state: AppState) => state.voteStore.votes;
