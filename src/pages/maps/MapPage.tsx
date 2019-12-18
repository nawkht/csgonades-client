import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { Nade } from "../../models/Nade";
import { NadeList } from "../../ui-common/NadeList";

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
