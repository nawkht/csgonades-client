import { FC } from "react";
import { Layout } from "../components/layout/layout";
import { Nade } from "../models/Nade";
import { NadeList } from "../components/nadebox/NadeList";

type Props = {
  map: string;
  nades: Nade[];
};

export const MapPage: FC<Props> = ({ nades }) => {
  return (
    <Layout>
      <NadeList nades={nades} />
    </Layout>
  );
};
