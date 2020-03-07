import { FC, useEffect } from "react";
import { useBlog } from "../../store/BlogStore/BlogHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { BlogListItem } from "./BlogListItem";

type Props = {};

export const AdminBlogPostList: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { blogActions, blogState } = useBlog();

  useEffect(() => {
    blogActions.fetchBlogPosts();
  }, []);

  return (
    <>
      <div className="blog-list-wrapper">
        <h1>Blog</h1>
        <div>
          {blogState.blogPosts.map(a => (
            <BlogListItem key={a.id} article={a} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .blog-list-wrapper {
          background: ${colors.DP01};
          padding: 12px;
          border-radius: 4px;
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
