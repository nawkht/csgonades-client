import { FC } from "react";
import { Stats } from "./stats";
import { Jumbo } from "./jumbo";
import { Nade } from "../models/Nade";
import { Layout } from "../components/layout/layout";

interface Props {
  nades: Nade[];
}

export const FrontPage: FC<Props> = () => {
  return (
    <Layout>
      <Jumbo />
      <Stats />
    </Layout>
  );
};
