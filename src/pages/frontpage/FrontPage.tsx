import { FC } from "react";
import { FrontPageStats } from "./FrontPageStats";
import { Nade } from "../../models/Nade/Nade";
import { Layout } from "../../ui-common/layout/layout";
import { FrontPageJumbo } from "./FrontPageJumbo";

interface Props {
  nades: Nade[];
}

export const FrontPage: FC<Props> = () => {
  return (
    <Layout>
      <FrontPageJumbo />
      <FrontPageStats />
    </Layout>
  );
};
