import { FC, useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useVotes } from "../../store/VoteStore/hooks/useVotes";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { useAnalytics } from "../../utils/Analytics";

type Props = {
  nadeId: string;
};

export const NadeItemVoteControls: FC<Props> = ({ nadeId }) => {
  const [voteValue, setVoteValue] = useState(0);
  const { event } = useAnalytics();
  const { castVote, clearVote, votes } = useVotes();
  const isSignedIn = useIsSignedIn();
  const { setSignInWarning } = useSignInWarning();

  useEffect(() => {
    const currentVote = votes.find((v) => v.nadeId === nadeId);
    if (currentVote) {
      setVoteValue(currentVote.vote);
    }
  }, [votes, nadeId]);

  const isUpvoted = voteValue === 1;
  const isDownvoted = voteValue === -1;
  const upvoteColor = isUpvoted ? "#37d4c1" : "white";
  const downvoteColor = isDownvoted ? "#37d4c1" : "white";

  function onUpVote(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (!isSignedIn) {
      return setSignInWarning("vote");
    }

    if (isUpvoted) {
      setVoteValue(0);
      clearVote(nadeId);
      event({
        category: "Vote",
        action: "Clear",
      });
    } else {
      setVoteValue(1);
      castVote(nadeId, 1);
      event({
        category: "Vote",
        action: "Up",
      });
    }
  }

  function onDownVote(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (!isSignedIn) {
      return setSignInWarning("vote");
    }

    if (isDownvoted) {
      setVoteValue(0);
      clearVote(nadeId);
      event({
        category: "Vote",
        action: "Clear",
      });
    } else {
      setVoteValue(-1);
      castVote(nadeId, -1);
      event({
        category: "Vote",
        action: "Down",
      });
    }
  }

  return (
    <>
      <div className="vote-controls">
        <Popup
          content="Up Vote"
          size="mini"
          position="left center"
          mouseEnterDelay={200}
          inverted
          trigger={
            <button
              onClick={onUpVote}
              className="btn"
              style={{ color: upvoteColor }}
            >
              <FaChevronUp />
            </button>
          }
        />

        <Popup
          content="Down Vote"
          size="mini"
          position="left center"
          mouseEnterDelay={200}
          inverted
          trigger={
            <button
              onClick={onDownVote}
              className="btn"
              style={{ color: downvoteColor }}
            >
              <FaChevronDown style={{ position: "relative", top: 1 }} />
            </button>
          }
        />
      </div>
      <style jsx>{`
        .vote-controls {
          display: flex;
          flex-direction: column;
        }

        .btn {
          outline: none;
          background: rgba(0, 0, 0, 0.5);
          width: 35px;
          height: 35px;
          font-size: 18px;
          cursor: pointer;
          border-radius: 5px;
          margin-bottom: 5px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </>
  );
};
