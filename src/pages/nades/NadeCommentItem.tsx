import { NadeComment } from "../../models/NadeComment";
import { Colors } from "../../../constants/colors";

type Props = {
  comment: NadeComment;
};

export const NadeCommentItem: React.FC<Props> = ({ comment }) => {
  const { body, user } = comment;
  return (
    <>
      <div className="comment">
        <p>{user.nickname}</p>
        <p>{body}</p>
      </div>
      <style jsx>{`
        .comment {
          padding: 6px 12px;
          background: white;
          border-bottom: 1px solid ${Colors.PRIMARY_BORDER};
        }
      `}</style>
    </>
  );
};
