import { FC } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { blogTickrateAndJumpthrow } from "./tickrate-and-jumpthrow-bind";
import { BlogList } from "../../blog/BlogList";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { SEO } from "../../layout/SEO2";
import { blogPractiseConfig } from "./practice-config";

type Props = {};

const BlogPage: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const blogPosts = [blogPractiseConfig, blogTickrateAndJumpthrow];

  return (
    <>
      <SEO title="Blog" canonical="/blog" />
      <PageCentralize>
        <div className="blog-posts">
          <h1>Blog</h1>
          <BlogList posts={blogPosts} />
        </div>
      </PageCentralize>
      <style jsx>{`
        .blog-posts {
          margin-top: 75px;
          color: ${colors.TEXT};
        }

        h1 {
          text-align: center;
          font-weight: 300;
          margin-bottom: 50px;
        }
      `}</style>
    </>
  );
};

export default BlogPage;
