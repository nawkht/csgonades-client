import { FC } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { FrontPageRecentPosts } from "./FrontPageRecentPosts";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";

type Props = {
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = ({ recentNades }) => {
  return (
    <>
      <FrontPageJumbo />

      <PageCentralize>
        <FrontpageActions />

        <div className="recent-wrap">
          <FrontPageRecentPosts />
        </div>

        <EzoicPlaceHolder id={119} />

        <div className="recent-nade-wrap">
          <RecentNades recentNades={recentNades} />
        </div>
      </PageCentralize>

      <div className="bottom-placeholder">
        <EzoicPlaceHolder id={110} />
      </div>

      <style jsx>{`
        .recent-wrap {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .recent-nade-wrap {
          margin-top: 30px;
          margin-bottom: 60px;
        }

        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
        }

        .recent {
          display: flex;
          flex-direction: row;
          margin-top: 100px;
          margin-bottom: 100px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .recent {
            flex-direction: column;
          }

          .recent-nade-wrap {
            margin-left: -20px;
            margin-right: -20px;
          }
        }
      `}</style>
    </>
  );
};
