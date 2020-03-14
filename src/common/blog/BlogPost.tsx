import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EzoicPlaceHolder } from "../ezoicLoader/EzoicPlaceHolder";

export type BlogData = {
  title: string;
  imageUrl: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  intro: string;
};

type Props = {
  data: BlogData;
};

export const BlogPost: FC<Props> = ({ children, data }) => {
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
                Image by{" "}
                <a href={data.imageCreditUrl} target="_top">
                  {data.imageCredit}
                </a>
              </div>
            )}
          </div>
          <p>{data.intro}</p>
          <div className="body">{children}</div>
        </article>
        <aside className="sidebar">
          <div className="ez mid-sidebar">
            <EzoicPlaceHolder desc="Blog | Big sidebar center" id={124} />
          </div>
        </aside>
      </div>
      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .ez {
        }

        .mid-sidebar {
          min-height: 600px;
          width: 100%;
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
        }

        p {
          margin: 0 auto;
          max-width: 800px;
          padding-bottom: 40px;
        }

        h1 {
          text-align: center;
          margin: 0;
          margin-bottom: 30px;
          font-size: 36px;
        }

        .body {
          max-width: 800px;
          display: block;
          margin: 0 auto;
        }

        .img-wrap {
          max-width: 850px;
          margin: 0 auto;
          margin-bottom: 50px;
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
      `}</style>
    </>
  );
};
