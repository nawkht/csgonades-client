import Head from "next/head";
import { FC, memo } from "react";

type Props = {
  title: string;
  description?: string;
  canonical?: string;
  thumbnail?: string;
};

export const PageHead: FC<Props> = memo(
  ({ title, description, canonical, thumbnail }) => {
    const pageDescription = description
      ? description
      : "CSGO Nades is a website that collects nades for Counter-Strike Global Offensive. You can browse smokes, flashbangs, molotovs or he-grenades for the most popular maps in CS:GO.";

    return (
      <>
        <Head>
          <title>{title}</title>
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
        </Head>
        <style jsx>{``}</style>
      </>
    );
  }
);
