import { Reducer } from "redux";
import { assertNever } from "../../utils/Common";
import { Vote } from "../../models/Vote";
import { VoteActions } from "./VoteActions";

export interface VoteStoreState {
  votes: Vote[];
}

const initialState: VoteStoreState = {
  votes: [],
};

export const VoteReducer: Reducer<VoteStoreState, VoteActions> = (
  state = initialState,
  action
): VoteStoreState => {
  switch (action.type) {
    case "VoteStore/ReplaceVotes":
      return {
        ...state,
        votes: action.votes,
      };
    case "VoteStore/AddVote":
      return {
        ...state,
        votes: [...state.votes, action.vote],
      };
    case "VoteStore/RemoveVote":
      return {
        ...state,
        votes: state.votes.filter((v) => v.id !== action.voteId),
      };
    default:
      assertNever(action);
      return state;
  }
};
