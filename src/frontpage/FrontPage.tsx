import { FC } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { NadeLight } from "../models/Nade/Nade";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";
import { FrontPageRecentPosts } from "./FrontPageRecentPosts";

type Props = {
  recentNades: NadeLight[];
};

export const FrontPage: FC<Props> = ({ recentNades }) => {
  return (
    <>
      <FrontPageJumbo />
      <RecentNades recentNades={recentNades} />
      <EzoicPlaceHolder desc="Front page | Over recent nades" id={119} />
      <FrontPageRecentPosts />
      <FrontpageActions />
      <div className="bottom-placeholder">
        <EzoicPlaceHolder desc="Front Page | Bottom" id={110} />
      </div>

      <style jsx>{`
        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};
