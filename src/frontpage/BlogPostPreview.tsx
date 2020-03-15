import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";
import { BlogPost } from "../blog/BlogPost";
import Link from "next/link";

type Props = {
  blogPost: BlogPost;
};

export const BlogPostPreview: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();

  const { thumbnailUrl, intro, title } = blogPost;

  return (
    <>
      <Link href={`/blog/${blogPost.slug}`} as={`/blog/${blogPost.slug}`}>
        <a className="blog-post-preview">
          <img src={thumbnailUrl} />

          <h3>{title}</h3>

          <p>{intro}</p>
          <span className="blog-post-date">
            {prettyDate(blogPost.createdAt)}
          </span>
        </a>
      </Link>
      <style jsx>{`
        .blog-post-preview {
          width: 320px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: ${colors.TEXT};
          background: ${colors.DP01};
          border-radius: 5px;
          margin: 20px;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          transform: scale(1);
          transition: transform 0.15s;
        }

        .blog-post-preview:hover {
          transform: scale(1.005);
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
          padding: 0px 30px;
          padding-bottom: 30px;
        }
      `}</style>
    </>
  );
};
