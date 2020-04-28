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
import { SidebarPanel } from "../common/SidebarPanel";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { AdUnit } from "../common/adunits/AdUnit";

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
        dateModified={data.updatedAt || data.createdAt}
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
      <article>
        <div id="article-title">
          <h1>{data.title}</h1>
        </div>
        <div id="article-image">
          <div className="img-wrap">
            <img className="article-img" src={data.imageUrl} />
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
          {children}
          <BlogAuthor />
        </div>
      </article>

      <aside id="blog-sidebar">
        <div id="blog-sidebar-wrap">
          <SidebarPanel first last title="SHARE">
            <NadeShareActions
              url={`/blog/${data.slug}`}
              title={data.title}
              image={data.thumbnailUrl}
              visisble={true}
            />
          </SidebarPanel>
          <div className="ph-unit">
            <AdUnit tagType="300x600" />
          </div>
        </div>
      </aside>

      <style jsx>{`
        .ph-unit {
          margin-top: 15px;
        }

        article {
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "blog-title"
            "blog-image"
            "blog-main"
            "blog-main";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
          max-width: 850px;
          margin: 30px;
          margin-bottom: 100px;
        }

        #article-title {
          width: 100%;
          grid-area: blog-title;
        }

        #article-title h1 {
          font-weight: 300;
          font-size: 32px;
        }

        #article-content {
          grid-area: blog-main;
          background: ${colors.DP02};
          padding: 20px 30px;
          border-radius: 5px;
          max-width: 100%;
        }

        #blog-sidebar {
          grid-area: sidebar;
          width: 300px;
          margin-right: 30px;
        }

        #blog-sidebar-wrap {
          position: sticky;
          top: calc(65px + 30px);
        }

        .article-date {
          color: #bbb;
          margin-bottom: 15px;
        }

        #article-image {
          grid-area: blog-image;
          max-width: 100%;
          border-radius: 5px;
          overflow: hidden;
        }

        .article-img {
          width: 100%;
          display: block;
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

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          article {
            margin: 0;
          }

          #article-content {
            grid-area: blog-main;
            background: ${colors.DP02};
            padding: 20px 15px;
            border-radius: 5px;
            max-width: 100%;
          }

          #article-title {
            padding: 15px;
          }

          #blog-sidebar {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
