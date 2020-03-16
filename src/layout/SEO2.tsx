import { FC, memo } from "react";
import Head from "next/head";
import { Nade } from "../models/Nade/Nade";
import { capitalize } from "../utils/Common";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  thumbnail?: string;
  nadeSeo?: Nade;
};

export const SEO: FC<Props> = memo(
  ({ description, title, canonical, thumbnail, nadeSeo }) => {
    const pageTitle = title ? `${title} - CSGO Nades` : `CSGO Nades`;
    const pageDescription = description
      ? description
      : "CSGO Nades is a website that collects nades for Counter-Strike Global Offensive. You can browse smokes, flashbangs, molotovs or he-grenades for the most popular maps in CS:GO.";
    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta
            name="keywords"
            content="dust2 train mirage inferno cobblestone overpass cache nades flashbang smoke incendiary molotov he grenade csgo cs:go counter-strike global offensive"
          />
          <meta name="og:description" content={description} />
          <meta name="og:title" content={title} />
          <meta name="og:site_name" content="CSGONades" />
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
        </Head>
      </>
    );
  }
);

function generateNadeLdJson(nade: Nade) {
  return `
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "${nadeTitleBuilder(nade)}",
  "description": "${nade.description}",
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
  const titleBuilder = [];

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
