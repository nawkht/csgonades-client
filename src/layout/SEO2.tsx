import { FC, memo } from "react";
import Head from "next/head";
import { Nade } from "../models/Nade/Nade";
import { capitalize, descriptionSimplify } from "../utils/Common";

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
  nadeSeo?: Nade;
  blogSchema?: BlogPostSchema;
};

export const SEO: FC<Props> = memo(
  ({ description, title, canonical, thumbnail, nadeSeo, blogSchema }) => {
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
          {!!nadeSeo && !!nadeSeo.gfycat.duration && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: generateNadeLdJson(nadeSeo) }}
            />
          )}
          {!!blogSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: generateBlogLdJson(blogSchema),
              }}
            />
          )}
        </Head>
      </>
    );
  }
);

function generateBlogLdJson(data: BlogPostSchema) {
  const schema = `
{
  “@context”: “http://schema.org”,
  “@type”: “BlogPosting”,
  “mainEntityOfPage”:{
    “@type”:”WebPage”,
    “@id”:”https://www.csgonades.com/blog/${data.url}”
  },
  “headline”: “${data.title}”,
  “image”: {
    “@type”: “ImageObject”,
    “url”: “${data.image.url}”,
    “height”: ${data.image.height},
    “width”: ${data.image.width}
  },
  “datePublished”: “${data.datePublished}”,
  “author”: {
    “@type”: “Person”,
    “name”: “Mellet”
  },
  “publisher”: {
    “@type”: “Organization”,
    “name”: “CSGO Nades”,
    “logo”: {
      “@type”: “ImageObject”,
      “url”: “https://www.csgonades.com/logo.png”,
      “width”: 472,
      “height”: 304
    }
  },
  “description”: “${data.description}”,
}`;
  return schema;
}

function generateNadeLdJson(nade: Nade) {
  return `
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${nadeTitleBuilder(nade)}",
  "description": "${descriptionSimplify(nade.description)}",
  "thumbnailUrl": [ "${nade.images.thumbnailUrl}" ],
  "uploadDate": "${nade.createdAt}",
  "duration": "${nade.gfycat.duration}",
  "contentUrl": "${nade.gfycat.largeVideoUrl}",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "http://schema.org/WatchAction" },
    "userInteractionCount": ${nade.viewCount}
  }
}`;
}

function nadeTitleBuilder(nade: Nade) {
  const { map, type, title } = nade;
  const titleBuilder: string[] = [];

  if (map) {
    titleBuilder.push(capitalize(map));
  }

  if (type) {
    titleBuilder.push(type);
    titleBuilder.push("for");
  }

  if (title && title.length) {
    titleBuilder.push(title);
  }

  if (titleBuilder.length === 0) {
    return "No title";
  }

  return titleBuilder.join(" ");
}
