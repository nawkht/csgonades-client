import { FC } from "react";
import { BlogPostPreview } from "./BlogPostPreview";
import { BlogPost } from "./BlogPost";

type Props = {
  posts: BlogPost[];
};

export const BlogList: FC<Props> = ({ posts }) => {
  return (
    <>
      <div className="blog-post-list">
        {posts.map((bp) => (
          <BlogPostPreview key={bp.title} blogPost={bp} />
        ))}
      </div>

      <style jsx>{`
        .blog-post-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-left: -20px;
          margin-right: -20px;
          margin-top: -20px;
        }
      `}</style>
    </>
  );
};
