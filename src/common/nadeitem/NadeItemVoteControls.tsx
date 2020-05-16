import { FC, useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useVotes } from "../../store/VoteStore/hooks/useVotes";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { useAnalytics } from "../../utils/Analytics";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nadeId: string;
};

export const NadeItemVoteControls: FC<Props> = ({ nadeId }) => {
  const { colors } = useTheme();
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
            <button onClick={onUpVote} className="btn up">
              <FaChevronUp className="icon-fix-yo space-bottom" />
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
            <button onClick={onDownVote} className="btn down">
              <FaChevronDown className="icon-fix-yo space-top" />
            </button>
          }
        />
      </div>
      <style jsx global>{`
        .icon-fix-yo {
          font-size: 16px;
          margin: 0;
          padding: 0;
          line-height: 16px;
        }

        .space-bottom {
          padding-bottom: 2px;
        }

        .space-top {
          padding-top: 2px;
        }
      `}</style>

      <style jsx>{`
        .vote-controls {
          display: flex;
          flex-direction: column;
        }

        .btn {
          outline: none;
          background: rgba(0, 0, 0, 0.5);
          width: 36px;
          height: 36px;
          cursor: pointer;
          border-radius: 5px;
          margin-bottom: 5px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .up {
          color: ${isUpvoted ? colors.SUCCESS : "white"};
        }

        .down {
          color: ${isDownvoted ? colors.ERROR : "white"};
        }

        .up:hover {
          background: rgba(0, 0, 0, 0.8);
          color: ${colors.SUCCESS};
        }

        .down:hover {
          background: rgba(0, 0, 0, 0.8);
          color: ${colors.ERROR};
        }
      `}</style>
    </>
  );
};
