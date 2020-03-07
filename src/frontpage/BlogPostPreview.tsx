import { FC } from "react";
import { BlogPostLight } from "../models/BlogPost";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../utils/DateUtils";

type Props = {
  blogPost: BlogPostLight;
};

export const BlogPostPreview: FC<Props> = ({ blogPost }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="blog-post-preview">
        <img src={blogPost.images.thumbnailUrl} />

        <h3>{blogPost.title}</h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          debitis aliquid vel magni.
        </p>
        <span className="blog-post-date">{prettyDate(blogPost.updatedAt)}</span>
      </div>
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
        }

        .blog-post-preview p {
          padding: 0px 30px;
          margin-bottom: 15px;
          font-size: 16px;
          color: #545454;
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
