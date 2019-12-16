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
    let isCancelled = false;
    const fetchComments = async () => {
      try {
        const comments = await NadeCommentApi.byNadeId(nadeId);
        if (!isCancelled) {
          setComments(comments);
        }
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();

    return () => {
      isCancelled = true;
    };
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
