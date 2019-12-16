import { Nade } from "../models/Nade";
import { Layout } from "../components/layout/layout";
import { NadePageMain } from "../components/NadePageMain";
import { NadeTitlebar } from "../components/newnade/NadeTitlebar";
import { NadeMetaPanel } from "../components/nadepage/NadeMeta/NadeMetaPanel";
import { NadeStatus } from "../components/nadepage/NadeStatus";
import { UserContainer } from "../components/nadepage/UserContainer";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  return (
    <Layout>
      <NadeTitlebar nadeId={nade.id} title={nade.title} />
      <div className="nade-container">
        <div className="nade-main">
          <NadePageMain nade={nade} />
        </div>
        <div className="nade-aside">
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <NadeMetaPanel nade={nade} />
          <UserContainer user={nade.user} marginTop={18} />
        </div>
      </div>
      <style jsx>
        {`
          .nade-container {
            display: flex;
            padding: 18px;
          }
          .nade-main {
            flex: 2;
            margin-right: 18px;
          }
          .nade-aside {
            flex: 1;
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
