import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { SiteStats } from "../api/StatsApi";
import { blogNadeAlignCrosshair } from "../pages/blog/smoke-align-crosshair";
import { bestDust2Nades } from "../pages/blog/best-dust2-nades";
import { BlogList } from "../blog/BlogList";
import { blogJumpthrowBind } from "../pages/blog/jumpthrow-bind";
import { Dimensions } from "../constants/Constants";

const recentPosts = [blogJumpthrowBind, bestDust2Nades, blogNadeAlignCrosshair];

type Props = {
  recentNades: NadeLight[];
  stats: SiteStats | null;
};

export const FrontPage: FC<Props> = memo(({ recentNades, stats }) => {
  return (
    <>
      <div id="front-page">
        <FrontPageJumbo stats={stats} />

        <div className="recent-wrap">
          <BlogList posts={recentPosts} />
        </div>

        <div className="recent-nade-wrap">
          <RecentNades recentNades={recentNades} />
        </div>
      </div>
      <aside className="front-page-sidebar">
        <div id="sidebar-wrap">
          <FrontpageActions />
          <div className="sidebar-placeholder"></div>
        </div>
      </aside>

      <style jsx>{`
        aside {
          grid-area: sidebar;
          width: 300px;
        }

        #sidebar-wrap {
          position: sticky;
          top: calc(65px + ${Dimensions.GUTTER_SIZE}px);
        }

        #front-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
        }

        .recent-wrap {
          margin-bottom: 75px;
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .recent {
          display: flex;
          flex-direction: row;
          margin-top: 100px;
          margin-bottom: 100px;
        }

        @media only screen and (max-width: 1210px) {
          #front-page {
            margin-right: 30px;
          }

          aside {
            width: 100%;
          }
        }

        @media only screen and (max-width: 910px) {
          #front-page {
            margin: 15px;
          }
        }

        @media only screen and (max-width: 340px) {
          #front-page {
            margin: 0px;
          }
        }
      `}</style>
    </>
  );
});
