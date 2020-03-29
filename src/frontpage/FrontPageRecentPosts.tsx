import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";
import { blogPractiseConfig } from "../pages/blog/practice-config";
import { BlogListRecent } from "../blog/BlogListRecent";
import { memo } from "react";
import { blogNadeAlignCrosshair } from "../pages/blog/smoke-align-crosshair";

export const FrontPageRecentPosts = memo(({}) => {
  return (
    <>
      <div className="recent-posts">
        <BlogListRecent
          posts={[
            blogNadeAlignCrosshair,
            blogPractiseConfig,
            blogTickrateAndJumpthrow,
          ]}
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
