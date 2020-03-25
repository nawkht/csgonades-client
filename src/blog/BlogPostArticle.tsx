import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { BlogPost } from "./BlogPost";
import { Dimensions } from "../constants/Constants";
import { useNewAdRefresher } from "../layout/useAdRefresher";

type Props = {
  data: BlogPost;
};

export const BlogPostArticle: FC<Props> = ({ children, data }) => {
  useNewAdRefresher();
  const { colors } = useTheme();

  return (
    <>
      <div className="article-wrap">
        <div className="empty" />
        <article>
          <h1>{data.title}</h1>
          <div className="img-wrap">
            <img className="article-image" src={data.imageUrl} />
            {!!data.imageCredit && !!data.imageCreditUrl && (
              <div className="image-credit">
                Photo by{" "}
                <a href={data.imageCreditUrl} target="_top">
                  {data.imageCredit}
                </a>
              </div>
            )}
          </div>
          <p className="lead">{data.intro}</p>
          {children}
        </article>
        <aside className="sidebar">
          <div className="ez mid-sidebar">
            <EzoicPlaceHolder id={124} />
          </div>
        </aside>
      </div>
      <style jsx>{`
        .body {
          padding-top: 1.5rem;
        }

        .sidebar {
          margin-top: 100px;
          max-height: 250vh;
        }

        .ez {
          position: sticky;
          top: 15vh;
        }

        .article-wrap {
          display: flex;
          max-width: calc(850px + 300px + 300px + 100px);
          margin: 0 auto;
        }

        .empty,
        .sidebar {
          width: 300px;
        }

        .empty {
          margin-right: 50px;
        }

        .sidebar {
          margin-left: 50px;
        }

        article {
          margin-top: 50px;
          margin-bottom: 50px;
          color: ${colors.TEXT};
          max-width: 800px;
        }

        h1 {
          text-align: center;
        }

        .img-wrap {
          margin-bottom: 50px;
          margin-left: -20px;
          margin-right: -20px;
        }

        .article-image {
          max-width: 100%;
          display: block;
          margin: 0 auto;
        }

        .image-credit {
          text-align: right;
          padding-top: 10px;
          font-style: italic;
        }

        .image-credit a {
          color: ${colors.PRIMARY};
        }

        .image-credit a:hover {
          text-decoration: underline;
        }

        .article-wrap {
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .empty,
          .sidebar {
            display: none;
          }

          .img-wrap {
            margin-left: 0;
            margin-right: 0;
          }

          article {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};
