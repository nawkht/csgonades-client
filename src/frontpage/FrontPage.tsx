import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { FrontPageRecentPosts } from "./FrontPageRecentPosts";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { SiteStats } from "../api/StatsApi";
import { AdUnit } from "../common/adunits/AdUnit";

type Props = {
  recentNades: NadeLight[];
  stats: SiteStats | null;
};

export const FrontPage: FC<Props> = memo(({ recentNades, stats }) => {
  return (
    <>
      <FrontPageJumbo stats={stats} />

      <PageCentralize>
        <div className="top-placeholder">
          <AdUnit center tagType="mega-banner" />
        </div>

        <div className="recent-wrap">
          <FrontPageRecentPosts />
          <aside className="front-page-sidebar">
            <iframe
              src="https://discordapp.com/widget?id=181028616061190144&theme=dark"
              width="100%"
              height="400"
              frameBorder="0"
            ></iframe>
            <FrontpageActions />
            <div className="sidebar-placeholder">
              <AdUnit tagType="top-medium-rectangle" />
            </div>
          </aside>
        </div>

        <div className="recent-nade-wrap">
          <RecentNades recentNades={recentNades} />
        </div>
      </PageCentralize>

      <style jsx>{`
        .recent-wrap {
          margin-top: 75px;
          margin-bottom: 75px;
          display: flex;
        }

        .front-page-sidebar {
          margin-left: 30px;
          width: 300px;
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .top-placeholder {
          margin-top: 50px;
        }

        .recent {
          display: flex;
          flex-direction: row;
          margin-top: 100px;
          margin-bottom: 100px;
        }

        @media only screen and (max-width: 1000px) {
          .recent-wrap {
            flex-direction: column;
          }

          .front-page-sidebar {
            margin-left: 0;
            width: 100%;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .recent {
            flex-direction: column;
          }

          .recent-nade-wrap {
            margin-left: -10px;
            margin-right: -10px;
          }
        }
      `}</style>
    </>
  );
});
