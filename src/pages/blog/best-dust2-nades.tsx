import { BlogPost } from "../../blog/BlogPost";
import { BlogPostArticle } from "../../blog/BlogPostArticle";
import { BlogNadeItem } from "../../blog/BlogNadeItem";
import { PageLink } from "../../common/PageLink";
import { Dimensions } from "../../constants/Constants";
import { AdUnit } from "../../common/adunits/AdUnit";
import { FC, useEffect } from "react";
import Link from "next/link";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";

export const bestDust2Nades: BlogPost = {
  title: "Best Grenade Spots for Dust2 - Must Know!",
  slug: "best-dust2-nades",
  imageUrl: "/blogimg/dust2-b.jpg",
  thumbnailUrl: "/blogimg/dust2-b_thumb.jpg",
  createdAt: "2020-04-23T02:32:00.000Z",
  updatedAt: "2020-05-09T12:48:37.104Z",
  intro:
    "Dust2 is one of the most popular maps in CS:GO. Let's take a look at the essential nades everyone should know to gain an edge on the map.",
};

const PractiseConfigBlogPost = () => {
  const displayToast = useDisplayToast();

  useEffect(() => {
    const delay = setTimeout(() => {
      displayToast({
        severity: "info",
        message:
          "Sorry to disturb 😏 You can click on Dust2 in the navigation to see even more nades for the map. Carry on!🖖",
        title: "Psst...",
        durationSeconds: 20,
      });
    }, 1000 * 10);
    return () => clearTimeout(delay);
  }, [displayToast]);

  return (
    <>
      <BlogPostArticle SideBarComp={BlogSideBar} data={bestDust2Nades}>
        <p>
          Dust2 is probably one of the most recognized maps in CS:GO. If you
          enter a competitive queue, it&apos;s a very high chance you will be
          playing on Dust2. The map is also one of the most beginner-friendly
          maps with a simple layout. So many new players will be starting their
          journey into Counter-Strike Global Offensive on this map. So
          let&apos;s jump straight in and see the essential utility you will
          need to excel on Dust2.
        </p>

        <p>
          This list is my personal favorites, but you can also browse{" "}
          <Link href="/maps/[map]" as="/maps/dust2">
            all Dust2 nades
          </Link>{" "}
          to find your own preferrences.
        </p>

        <h2>1. Xbox Smoke</h2>
        <p>
          Aaah... Xbox. Everyone wants to smoke Xbox. Why? Because there is
          always an annoying AWP in mid stopping you from going short. So here
          are two options for you. For 64 tick and 128 tick, both use{" "}
          <PageLink href="/blog/jumpthrow-bind" as="/blog/jumpthrow-bind">
            jumpthrow bind
          </PageLink>
          .
        </p>
        <p className="tip">
          <strong>
            Tip: Mouse over the thumbnail and it will play the video.
          </strong>
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-xbox-from-t-spawn-7Nn" />
          <BlogNadeItem nadeSlug="dust2-smoke-xbox-from-t-spawn" />
        </div>

        <h2>2. Long Corner Smoke</h2>
        <p>
          Why do we throw this smoke? It forces the CT to have to go wide to
          spot double doors on long. This way, even if he gets the first frag,
          the follow up has a chance to get them through the smoke when they try
          to retreat. If the smoke is not present, the CT can get a frag and
          move behind the wall for cover.
        </p>

        <p>
          Here are my favourites, but go over to{" "}
          <Link href="/maps/[map]" as="/maps/dust2">
            Dust2 nades
          </Link>{" "}
          if you prefer to throw it from T Spawn:
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-long-corner-from-long-doors" />
          <BlogNadeItem nadeSlug="dust2-smoke-long-corner-from-outside-long" />
        </div>

        <div className="a-tag">
          <AdUnit tagType="300x250" />
        </div>

        <h2>3. A Site, CT Spawn</h2>
        <p>
          Almost there, let&apos;s plant A site! Nothing can stop us now... Oh,
          wait... You just got fragged by an AWP while crossing to A-site. You
          should have smoked CT spawn. <br />
          You can just wing this one pretty easily, but you could get caught
          with a nade in your hand.
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-ct-spawn-from-long-doors" />
        </div>
        <h2>4. The Mid to B Smoke</h2>
        <p>
          Rush B!? Rush A!!.. Nah... Let&apos;s go mid to B instead. Throw this
          smoke and do a B split. Optionally throw the flash to make life a
          little easier. It flashes anyone standing behind the door perfectly.
        </p>
        <div className="nade-list">
          <BlogNadeItem nadeSlug="dust2-smoke-ct-spawn-from-xbox" />
          <BlogNadeItem nadeSlug="flash-mid-doors-from-xbox" />
        </div>

        <h2>5. B Door Smoke</h2>
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
          If you want to learn even more nades for Dust2,{" "}
          <Link href="/maps/[map]" as="/maps/dust2">
            head over to see all the nades for Dust2
          </Link>
          . Or, if you know a good one, sign in and add it for everyone else to
          enjoy!
        </p>

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
        .a-tag {
          margin: 30px 0px;
        }

        .tip {
          text-align: center;
        }

        .dust2-cta {
          background: #0f456e;
          border-radius: 10px;
          color: white;
          display: block;
          margin: 30px auto;
          padding: 15px 30px;
          width: 200px;
          text-align: center;
          font-weight: 500;
          font-size: 18px;
        }

        .nade-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 30px;
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

        @media only screen and (max-width: 400px) {
          .nade-list {
            margin-left: -10px;
            margin-right: -10px;
          }
        }
      `}</style>
    </>
  );
};

const BlogSideBar: FC = () => {
  return (
    <>
      <div className="blog-sidebar">
        <Link href="/maps/[map]" as="/maps/dust2">
          <button className="cta">
            <span>Find Dust2 Smokes</span>{" "}
            <img src="/icons/grenades/smoke.png" />
          </button>
        </Link>
        <Link href="/maps/[map]" as="/maps/dust2">
          <button className="cta">
            <span>Find Dust2 Flashes</span>{" "}
            <img src="/icons/grenades/flash.png" />
          </button>
        </Link>
        <Link href="/maps/[map]" as="/maps/dust2">
          <button className="cta">
            <span>Find Dust2 Molotovs</span>{" "}
            <img src="/icons/grenades/molotov.png" />
          </button>
        </Link>
      </div>
      <style jsx>{`
        .blog-sidebar {
          margin-bottom: 50vh;
        }

        .cta {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          background: #106b5c;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border-radius: 5px;
          cursor: pointer;
        }

        .cta:hover {
          background: #0b4d42;
        }

        .cta span {
          white-space: nowrap;
          color: white;
          margin-bottom: 5px;
        }

        .cta img {
          width: 30px;
          height: 30px;
          display: block;
        }
      `}</style>
    </>
  );
};

export default PractiseConfigBlogPost;
