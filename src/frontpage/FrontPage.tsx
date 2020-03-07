import { FC } from "react";
import { Layout2 } from "../common/layout/Layout2";
import { BlogList } from "./BlogList";
import { FrontpageActions } from "./FrontpageActions";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { RecentNades } from "./RecentNades";

export const FrontPage: FC = () => {
  return (
    <Layout2 canonical="">
      <FrontPageJumbo />
      {false && <BlogList />}
      <RecentNades />
      <FrontpageActions />
    </Layout2>
  );
};
