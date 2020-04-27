import { FC } from "react";
import { blogTickrateAndJumpthrow } from "./tickrate-and-jumpthrow-bind";
import { BlogList } from "../../blog/BlogList";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { SEO } from "../../layout/SEO2";
import { blogPractiseConfig } from "./practice-config";
import { blogNadeAlignCrosshair } from "./smoke-align-crosshair";
import { bestDust2Nades } from "./best-dust2-nades";
import { blogJumpthrowBind } from "./jumpthrow-bind";

type Props = {};

const BlogPage: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const blogPosts = [
    blogJumpthrowBind,
    bestDust2Nades,
    blogNadeAlignCrosshair,
    blogPractiseConfig,
    blogTickrateAndJumpthrow,
  ];

  return (
    <>
      <SEO title="Blog" canonical="/blog" />
      <div className="blog-posts">
        <h1>Blog</h1>
        <BlogList posts={blogPosts} />
      </div>
      <aside></aside>
      <style jsx>{`
        aside {
          grid-area: sidebar;
          width: 300px;
        }
        .blog-posts {
          color: ${colors.TEXT};
          grid-area: main;
          margin: 30px;
          margin-bottom: 100px;
        }

        h1 {
          font-weight: 300;
          margin-bottom: 30px;
          font-size: 32px;
        }
      `}</style>
    </>
  );
};

export default BlogPage;
