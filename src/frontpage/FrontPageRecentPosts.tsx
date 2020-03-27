import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";
import { blogPractiseConfig } from "../pages/blog/practice-config";
import { BlogListRecent } from "../blog/BlogListRecent";
import { memo } from "react";

export const FrontPageRecentPosts = memo(({}) => {
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
});
