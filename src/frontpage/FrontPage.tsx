import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { SiteStats } from "../api/StatsApi";
import { AdUnit } from "../common/adunits/AdUnit";
import { blogNadeAlignCrosshair } from "../pages/blog/smoke-align-crosshair";
import { blogPractiseConfig } from "../pages/blog/practice-config";
import { bestDust2Nades } from "../pages/blog/best-dust2-nades";
import { BlogList } from "../blog/BlogList";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

const recentPosts = [
  bestDust2Nades,
  blogNadeAlignCrosshair,
  blogPractiseConfig,
];

type Props = {
  recentNades: NadeLight[];
  stats: SiteStats | null;
};

export const FrontPage: FC<Props> = memo(({ recentNades, stats }) => {
  const { colors } = useTheme();

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
          <div className="sidebar-placeholder">
            <AdUnit tagType="top-medium-rectangle" />
          </div>
        </div>
      </aside>

      <style jsx>{`
        aside {
          grid-area: sidebar;
          width: 300px;
          background: ${colors.DP02};
        }

        #sidebar-wrap {
          position: sticky;
          top: 65px;
          padding: 30px 30px;
        }

        #front-page {
          grid-area: main;
          margin: 30px;
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
      `}</style>
    </>
  );
});
