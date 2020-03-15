import { FC } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogList } from "../blog/BlogList";
import { blogTickrateAndJumpthrow } from "../pages/blog/tickrate-and-jumpthrow-bind";

type Props = {};

export const FrontPageRecentPosts: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <PageCentralize>
        <div className="recent-posts">
          <h3>Recent posts</h3>
          <BlogList posts={[blogTickrateAndJumpthrow]} />
        </div>
      </PageCentralize>
      <style jsx>{`
        h3 {
          text-align: center;
          font-weight: 300;
          color: ${colors.TEXT};
        }

        .recent-posts {
          padding-bottom: 100px;
          padding-top: 30px;
        }
      `}</style>
    </>
  );
};
