import { FC } from "react";
import { BlogPostLight } from "../../models/BlogPost";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  article: BlogPostLight;
};

export const BlogListItem: FC<Props> = ({ article }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="blog-list-item">
        <span className="blog-list-title">{article.title}</span>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <style jsx>{`
        .blog-list-item {
          border-bottom: 1px solid ${colors.BORDER};
          padding-bottom: 12px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }

        .blog-list-title {
          flex: 1;
        }
      `}</style>
    </>
  );
};
