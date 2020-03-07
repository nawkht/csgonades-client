import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { BlogPostLight } from "../models/BlogPost";
import { useBlog } from "../store/BlogStore/BlogHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogPostPreview } from "./BlogPostPreview";

type Props = {};

export const BlogList: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { blogActions, blogState } = useBlog();

  const blogPosts: BlogPostLight[] = [
    {
      id: "",
      createdAt: new Date(),
      images: {
        thumbnailUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
        largeUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
      },
      slug: "test",
      status: "published",
      title: "Why tickrate affects jumpthrow bind",
      updatedAt: new Date(),
    },
    {
      id: "",
      createdAt: new Date(),
      images: {
        thumbnailUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
        largeUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
      },
      slug: "test",
      status: "published",
      title: "Tickrate and its effects on jumpthrow bind",
      updatedAt: new Date(),
    },
    {
      id: "",
      createdAt: new Date(),
      images: {
        thumbnailUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
        largeUrl:
          "https://storage.googleapis.com/csgonades-3308a.appspot.com/articles/r6pYfrfe_pD-sJbod44GW.jpg",
      },
      slug: "test",
      status: "published",
      title: "Why tickrate affects jumpthrow bind",
      updatedAt: new Date(),
    },
  ];

  return (
    <>
      <div className="centralizer">
        <div className="blog-post-list">
          {blogPosts.map(bp => (
            <BlogPostPreview key={bp.id} blogPost={bp} />
          ))}
        </div>

        <div className="blog-btn-wrap">
          <button className="blog-btn">More blog posts</button>
        </div>
      </div>

      <style jsx>{`
        .centralizer {
          max-width: 90vw;
          margin: 0 auto;
          position: relative;
          padding: 40px;
        }

        .blog-post-list {
          padding: ${Dimensions.GUTTER_SIZE};
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-left: -20px;
          margin-right: -20px;
        }

        .blog-btn-wrap {
          display: flex;
          justify-content: space-around;
          margin-bottom: 100px;
        }

        .blog-btn {
          outline: none;
          background: transparent;
          padding: 15px 30px;
          border: 1px solid #545454;
          color: #545454;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
