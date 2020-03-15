import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogList } from "../blog/BlogList";
import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";
import { Dimensions } from "../constants/Constants";

type Props = {};

export const FrontPageRecentPosts: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="recent-posts">
        <h3>Recent posts</h3>
        <BlogList posts={[blogTickrateAndJumpthrow]} />
      </div>
      <style jsx>{`
        h3 {
          text-align: center;
          font-weight: 300;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
