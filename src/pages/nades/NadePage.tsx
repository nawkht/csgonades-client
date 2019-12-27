import { Nade } from "../../models/Nade";
import { Layout } from "../../ui-common/layout/layout";
import { NadeTitlebar } from "./NadeTitlebar";
import { NadeMetaPanel } from "./NadeMeta/NadeMetaPanel";
import { NadeStatus } from "./NadeStatus/NadeStatus";
import { UserContainer } from "./UserContainer";
import { AdminEditor } from "./AdminEditor/AdminEditor";
import { useCanEditNade } from "../../store/NadeStore/NadeHooks";
import { GfycatPlayerContrainer } from "../../ui-common/GfycatPlayerContainer";
import { NadeDescription } from "./NadeDescription/NadeDescription";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  const allowEdit = useCanEditNade(nade);

  return (
    <Layout>
      <NadeTitlebar nade={nade} allowEdit={allowEdit} />
      <div className="nade-container">
        <div className="nade-main">
          <GfycatPlayerContrainer nade={nade} allowEdit={allowEdit} />
          <NadeDescription nade={nade} />
        </div>
        <div className="nade-aside">
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <NadeMetaPanel allowEdit={allowEdit} nade={nade} />
          <UserContainer user={nade.user} marginTop={18} />
          <AdminEditor nade={nade} />
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
