import { FC } from "react";
import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";
import { blogPractiseConfig } from "../pages/blog/practice-config";
import { BlogListRecent } from "../blog/BlogListRecent";

type Props = {};

export const FrontPageRecentPosts: FC<Props> = ({}) => {
  return (
    <>
      <div className="recent-posts">
        <BlogListRecent
          posts={[blogPractiseConfig, blogTickrateAndJumpthrow]}
        />
      </div>
      <style jsx>{`
        .recent-posts {
          flex: 1;
        }
      `}</style>
    </>
  );
};
