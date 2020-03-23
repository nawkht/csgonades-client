import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogList } from "../blog/BlogList";
import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";

type Props = {};

export const FrontPageRecentPosts: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="recent-posts">
        <h2>Recent Posts</h2>
        <BlogList posts={[blogTickrateAndJumpthrow]} />
      </div>
      <style jsx>{`
        h2 {
          text-align: center;
          font-weight: 300;
          font-size: 24px;
          margin-bottom: 40px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
