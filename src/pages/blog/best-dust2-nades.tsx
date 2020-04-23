import { BlogPost } from "../../blog/BlogPost";
import { BlogPostArticle } from "../../blog/BlogPostArticle";
import { BlogNadeItem } from "../../blog/BlogNadeItem";
import { PageLink } from "../../common/PageLink";
import { Dimensions } from "../../constants/Constants";

export const bestDust2Nades: BlogPost = {
  title: "Best Grenade Spots for Dust2 - Must Know!",
  slug: "best-dust2-nades",
  imageUrl: "/blogimg/dust2-b.jpg",
  thumbnailUrl: "/blogimg/dust2-b_thumb.jpg",
  createdAt: "2020-04-23T02:32:00.000Z",
  intro:
    "Dust2 is one of the most popular maps in CS:GO. Let's take a look at the essential nades everyone should know to gain an edge on the map.",
};

const PractiseConfigBlogPost = () => {
  return (
    <>
      <BlogPostArticle data={bestDust2Nades}>
        <p>
          Dust2 is probably one of the most recognized maps in CS:GO. If you
          enter a competitive queue, it&apos;s a very high chance you will be
          playing on Dust2. The map is also one of the most beginner-friendly
          maps with a simple layout. So many new players will be starting their
          journey into Counter-Strike Global Offensive on this map. So
          let&apos;s jump straight in and see the essential utility you will
          need to excel on Dust2.
        </p>

        <h2>1. Xbox smoke</h2>
        <p>
          Aaah... Xbox. Everyone wants to smoke Xbox. Why? Because there is
          always an annoying AWP in mid stopping you from going short. So here
          are three options for you. For 64 tick and 128 tick if you use{" "}
          <PageLink
            href="/blog/tickrate-and-jumpthrow-bind"
            as="/blog/tickrate-and-jumpthrow-bind"
          >
            jumpthrow bind
          </PageLink>
          , or the last one if you prefer not to use the bind.
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-xbox-from-t-spawn-7Nn" />
          <BlogNadeItem nadeSlug="dust2-smoke-xbox-from-t-spawn" />
          <BlogNadeItem nadeSlug="dust2-smoke-xbox-from-top-mid-aJd" />
        </div>

        <h2>2. Long corner smoke</h2>
        <p>
          Why do we throw this smoke? It forces the CT to have to go wide to
          spot double doors on long. This way, even if he gets the first frag,
          the follow up has a chance to get them through the smoke when they try
          to retreat. If the smoke is not present, the CT can get a frag and
          move behind the wall for cover.
        </p>
        <p>
          Here are my favourites, but go over to{" "}
          <PageLink href={`/maps/[map]`} as={`/maps/dust2`}>
            Dust2 nades
          </PageLink>{" "}
          if you prefer to throw it from T Spawn:
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-long-corner-from-long-doors" />
          <BlogNadeItem nadeSlug="dust2-smoke-long-corner-from-outside-long" />
        </div>
        <h2>3. A Site, CT Spawn</h2>
        <p>
          Almost there, let&apos;s plant A site! Nothing can stop us now... Oh,
          wait... You just got fragged by an AWP while crossing to A-site. You
          should have smoked CT spawn. Here you go, some options:
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-ct-spawn-from-long-doors" />
          <BlogNadeItem nadeSlug="dust2-smoke-a-cross-from-long-doors" />
        </div>
        <h2>4. The mid to B smoke</h2>
        <p>
          Rush B!? Rush A!!.. Nah... Let&apos;s go mid to B instead. Throw this
          smoke and do a B split.
        </p>
        <BlogNadeItem nadeSlug="dust2-smoke-ct-spawn-from-xbox" />

        <h2>5. B Door smoke</h2>
        <p>
          Recently the skybox in tunnels was removed on Dust2; thrown some
          smokes through the roof! These are for B doors, but head over to the
          rest of the{" "}
          <PageLink href={`/maps/[map]`} as={`/maps/dust2`}>
            dust2 nades
          </PageLink>{" "}
          and find your favourite ones.
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-b-doors-from-upper-tunnel" />
          <BlogNadeItem nadeSlug="dust2-smoke-b-doors-from-upper-tunnel-xmR" />
        </div>

        <p>
          That&apos;s it, and you&apos;re now a pro! Just kidding, the utility
          is part of the game, but there is so much more to learn.
        </p>
        <p>
          If you want to learn even more nades for Dust2, head over there. Or,
          if you know a good one, sign in and add it for everyone else to enjoy!
        </p>
        <p>Here are some Dust2 tricks as well for inspiration:</p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/AAIceD_-NXg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p>And as always, when playing Dust2, rush B!</p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/8I8N4Me5r1I"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </BlogPostArticle>
      <style jsx>{`
        .nade-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .video-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          margin-bottom: 30px;
        }

        .video-container::after {
          padding-top: 56.25%;
          display: block;
          content: "";
        }

        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default PractiseConfigBlogPost;
