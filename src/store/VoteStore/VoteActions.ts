import { Vote } from "../../models/Vote";

type ReplaceVotes = {
  type: "VoteStore/ReplaceVotes";
  votes: Vote[];
};

type AddVote = {
  type: "VoteStore/AddVote";
  vote: Vote;
};

type RemoveVote = {
  type: "VoteStore/RemoveVote";
  voteId: string;
};

export type VoteActions = ReplaceVotes | AddVote | RemoveVote;
