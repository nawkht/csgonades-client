import { FC } from "react";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../common/layout/Layout2";
import { BlogList } from "./BlogList";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";

export const FrontPage: FC = () => {
  return (
    <Layout2 canonical="">
      <EzoicLoader codes={[110]} />
      <FrontPageJumbo />
      {false && <BlogList />}
      <RecentNades />
      <FrontpageActions />
      <div className="bottom-placeholder">
        <EzoicPlaceHolder id={110} />
      </div>
      <style jsx>{`
        .bottom-placeholder {
          margin-bottom: 100px;
          margin-top: 30px;
        }
      `}</style>
    </Layout2>
  );
};
