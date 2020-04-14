import { FC, memo } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BlogPost } from "./BlogPost";
import { Dimensions } from "../constants/Constants";
import { prettyDate } from "../utils/DateUtils";
import { BlogAuthor } from "./BlogAuthor";
import { NadeShareActions } from "../nades/NadeShareActions";
import { SEO } from "../layout/SEO2";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify } from "../utils/Common";
import { PageCentralize } from "../common/PageCentralize";
import { AdTag } from "../layout/AdContainer";

type Props = {
  data: BlogPost;
};

export const BlogPostArticle: FC<Props> = memo(({ children, data }) => {
  const { colors } = useTheme();

  return (
    <>
      <ArticleJsonLd
        url={`https://www.csgonades.com/blog/${data.slug}`}
        authorName="Mellet Solbakk"
        datePublished={data.createdAt}
        description={descriptionSimplify(data.intro)}
        images={[data.imageUrl]}
        publisherLogo="https://www.csgonades.com/logo.png"
        publisherName="CSGO Nades"
        title={data.title}
      />
      <SEO
        title={data.title}
        canonical={`/blog/${data.slug}`}
        description={data.intro}
        thumbnail={data.thumbnailUrl}
      />
      <PageCentralize>
        <article>
          <h1 id="article-title">{data.title}</h1>
          <div id="article-image">
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
          </div>

          <div id="article-content">
            <div className="article-date">{prettyDate(data.createdAt)}</div>
            <p className="lead">{data.intro}</p>
            <div className="blog-top-placement">
              <AdTag tagType="mega-banner" />
            </div>
            {children}
            <BlogAuthor />
          </div>

          <div id="social">
            <NadeShareActions
              url={`/blog/${data.slug}`}
              title={data.title}
              image={data.thumbnailUrl}
              visisble={true}
            />
          </div>

          <aside className="sidebar">
            <div className="sidebar-placement">
              <AdTag tagType="half-page" />
            </div>
          </aside>
        </article>
      </PageCentralize>
      <style jsx>{`
        article {
          display: grid;
          grid-template-columns: auto 300px;
          grid-template-areas:
            "title social"
            "image sidebar"
            "main sidebar"
            "main sidebar";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
          margin-top: ${Dimensions.GUTTER_SIZE * 2}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE * 2}px;
        }

        #social {
          grid-area: social;
        }

        h1#article-title {
          grid-area: title;
          font-weight: 300;
        }

        #article-content {
          grid-area: main;
        }

        aside {
          grid-area: sidebar;
          width: 100%;
        }

        .article-date {
          text-align: right;
          color: #bbb;
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

        .sidebar-placement {
          width: 300px;
          height: 600px;
          position: sticky;
          top: 50px;
        }

        .blog-top-placement {
          padding-bottom: 20px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          article {
            grid-template-columns: 1fr;
            grid-template-areas:
              "title"
              "social"
              "image"
              "main"
              "sidebar";
          }

          aside {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
