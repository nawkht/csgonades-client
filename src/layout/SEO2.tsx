import { FC, memo } from "react";
import Head from "next/head";
import { descriptionSimplify } from "../utils/Common";

export type BlogPostSchema = {
  url: string;
  title: string;
  image: { url: string; width: number; height: number };
  datePublished: string;
  description: string;
};

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  thumbnail?: string;
};

export const SEO: FC<Props> = memo(
  ({ description, title, canonical, thumbnail }) => {
    const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
    const pageDescription = descriptionSimplify(description);

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta
            name="keywords"
            content="dust2 train mirage inferno cobblestone overpass cache nades flashbang smoke incendiary molotov he grenade csgo cs:go counter-strike global offensive"
          />
          <meta name="og:description" content={pageDescription} />
          <meta name="og:title" content={pageTitle} />
          <meta name="og:site_name" content="CSGO Nades" />
          <meta name="og:type" content="website" />
          <meta name="og:locale" content="en_EN" />
          {canonical && (
            <link
              rel="canonical"
              href={`https://www.csgonades.com${canonical}`}
            />
          )}
          {canonical && (
            <meta
              property="og:url"
              content={`https://www.csgonades.com${canonical}`}
            />
          )}
          {thumbnail && <meta property="og:image" content={thumbnail} />}
        </Head>
      </>
    );
  }
);
