import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";
import { BlogPost } from "./BlogPost";
import { PageLink } from "../common/PageLink";

type Props = {
  blogPost: BlogPost;
};

export const BlogPostPreviewHorizontal: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();

  const { thumbnailUrl, intro, title } = blogPost;

  return (
    <>
      <PageLink href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
        <div className="blog-post-preview">
          <div className="blog-img"></div>

          <div className="content">
            <h3>{title}</h3>
            <p>{intro}</p>
            <div className="actions">
              <span className="actions-read-more">Read more</span>
              <span className="blog-post-date">
                {prettyDate(blogPost.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </PageLink>
      <style jsx>{`
        .blog-post-preview {
          width: 100%;
          display: flex;
          overflow: hidden;
          color: ${colors.TEXT};
          background: ${colors.DP01};
          border-radius: 5px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          margin-bottom: 50px;
        }

        .actions {
          margin-left: 30px;
          margin-right: 30px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
        }

        .content {
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: stretch;
        }

        .content p {
          flex: 1;
          padding: 0px 30px;
          margin-bottom: 15px;
          font-size: 16px;
          color: #545454;
          color: ${colors.TEXT};
        }

        .blog-img {
          width: 40%;
          background: url(${thumbnailUrl});
          background-position: center;
          background-size: cover;
          opacity: 0.9;
        }

        .actions-read-more {
          color: ${colors.PRIMARY};
          font-weight: normal;
        }

        .actions-read-more:hover {
          text-decoration: underline;
        }

        .blog-post-preview h3 {
          text-align: center;
          margin: 0;
          padding: 15px 30px;
          font-weight: 400;
          font-size: 20px;
          color: #545454;
          color: ${colors.TEXT};
        }

        .blog-post-date {
          text-align: right;
          color: #bbb;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
