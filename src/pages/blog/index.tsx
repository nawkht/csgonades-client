import { FC } from "react";
import { Layout2 } from "../../layout/Layout2";
import { withRedux } from "../../utils/WithRedux";
import { PageCentralize } from "../../common/PageCentralize";
import { blogTickrateAndJumpthrow } from "./tickrate-and-jumpthrow-bind";
import { BlogList } from "../../blog/BlogList";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

const BlogPage: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const blogPosts = [blogTickrateAndJumpthrow];

  return (
    <>
      <Layout2 canonical="/blog" title="Blog">
        <PageCentralize>
          <div className="blog-posts">
            <h1>Blog</h1>
            <BlogList posts={blogPosts} />
          </div>
        </PageCentralize>
      </Layout2>
      <style jsx>{`
        .blog-posts {
          margin-top: 50px;
          color: ${colors.TEXT};
        }

        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default withRedux(BlogPage);
