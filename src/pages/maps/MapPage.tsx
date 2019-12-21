import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeLight, CsgoMap } from "../../models/Nade";
import { NadeList } from "../../ui-common/NadeList";
import { NadeFilter } from "./NadeFilter";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPage: FC<Props> = ({ nades, map }) => {
  return (
    <Layout>
      <NadeFilter map={map} />
      <div className="nade-list">
        <NadeList nades={nades} />
      </div>
      <style jsx>{`
        .nade-list {
          margin-left: 35px;
        }
      `}</style>
    </Layout>
  );
};
