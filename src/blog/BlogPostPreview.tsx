import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";
import { BlogPost } from "./BlogPost";
import Link from "next/link";

type Props = {
  blogPost: BlogPost;
};

export const BlogPostPreview: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();

  const { thumbnailUrl, intro, title } = blogPost;

  return (
    <>
      <div className="blog-post-preview">
        <Link href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
          <a>
            <div className="blog-img"></div>

            <h3>{title}</h3>
          </a>
        </Link>

        <p>{intro}</p>

        <div className="actions">
          <Link href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
            <a className="actions-read-more">Read more</a>
          </Link>
          <span className="blog-post-date">
            {prettyDate(blogPost.createdAt)}
          </span>
        </div>
      </div>
      <style jsx>{`
        .actions {
          margin-left: 30px;
          margin-right: 30px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
        }

        .blog-img {
          height: 200px;
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

        .blog-post-preview {
          width: 350px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: ${colors.TEXT};
          background: ${colors.DP01};
          border-radius: 5px;
          margin: 20px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }

        .blog-post-preview img {
          display: inline-block;
          max-width: 100%;
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

        .blog-post-preview p {
          padding: 0px 30px;
          margin-bottom: 15px;
          font-size: 16px;
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
