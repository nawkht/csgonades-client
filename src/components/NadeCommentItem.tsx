import { NadeComment } from "../models/NadeComment";

type Props = {
  comment: NadeComment;
};

export const NadeCommentItem: React.FC<Props> = props => {
  return (
    <>
      <div className="comment">
        <p>{props.comment.body}</p>
      </div>
      <style jsx>{`
        .comment {
          padding: 6px 12px;
        }
      `}</style>
    </>
  );
};
