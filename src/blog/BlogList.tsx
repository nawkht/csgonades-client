import { FC } from "react";
import { BlogPostPreview } from "./BlogPostPreview";
import { BlogPost } from "./BlogPost";
import { Dimensions } from "../constants/Constants";

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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          width: 100%;
        }
      `}</style>
    </>
  );
};
