import { useSelector, useDispatch } from "react-redux";
import { userVotesSelector } from "../VoteSelectors";
import { useCallback, Dispatch } from "react";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { VoteApi } from "../../../api/VoteApi";
import { VoteActions } from "../VoteActions";

const useGlobalDispatch = () => {
  return useDispatch<Dispatch<VoteActions>>();
};

export const useVotes = () => {
  const dispatch = useGlobalDispatch();
  const getToken = useGetOrUpdateToken();
  const votes = useSelector(userVotesSelector);

  const fetchVotes = useCallback(async () => {
    const token = await getToken();

    if (!token) {
      return;
    }

    const voteRes = await VoteApi.getUserVotes(token);

    if (voteRes.isOk()) {
      dispatch({
        type: "VoteStore/ReplaceVotes",
        votes: voteRes.value,
      });
    }
  }, [dispatch, getToken]);

  const castVote = useCallback(
    async (nadeId: string, vote: number) => {
      const token = await getToken();

      if (!token) {
        console.warn("Not signed in");
        return;
      }

      const nadeHadVote = votes.find((v) => v.nadeId === nadeId);

      if (nadeHadVote) {
        dispatch({
          type: "VoteStore/RemoveVote",
          voteId: nadeHadVote.id,
        });
      }

      const voteRes = await VoteApi.castVote(nadeId, vote, token);

      if (voteRes.isOk()) {
        const vote = voteRes.value;
        dispatch({
          type: "VoteStore/AddVote",
          vote,
        });
      } else {
        console.error("Failed to cast vote");
      }
    },
    [getToken, dispatch, votes]
  );

  const clearVote = useCallback(
    async (nadeId: string) => {
      const token = await getToken();

      if (!token) {
        console.warn("Not signed in");
        return;
      }

      const voteToClear = votes.find((v) => v.nadeId === nadeId);

      if (!voteToClear) {
        console.warn("Trying to clear vote for no excisiting vpte");
        return;
      }

      await VoteApi.clearVote(voteToClear.id, token);

      dispatch({
        type: "VoteStore/RemoveVote",
        voteId: voteToClear.id,
      });
    },
    [dispatch, getToken, votes]
  );

  return {
    votes,
    castVote,
    clearVote,
    fetchVotes,
  };
};
