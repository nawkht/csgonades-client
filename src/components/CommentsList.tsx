import React from "react";
import { NadeComment } from "../models/NadeComment";
import { NadeCommentApi } from "../api/CommentApi";
import { NadeCommentItem } from "./NadeCommentItem";

type Props = {
  nadeId: string;
};

const CommentList: React.FC<Props> = ({ nadeId }) => {
  const [comments, setComments] = React.useState<NadeComment[]>([]);
  React.useEffect(() => {
    NadeCommentApi.byNadeId(nadeId)
      .then(nadeComments => {
        setComments(nadeComments);
      })
      .catch(err => console.error(err));
  });

  return (
    <>
      <div className="comment-list">
        <h3>Comments</h3>
        {comments.map(comment => (
          <NadeCommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <style jsx>{`
        .comment-list {
          margin-top: 18px;
          margin-bottom: 100px;
        }
      `}</style>
    </>
  );
};

export { CommentList };
