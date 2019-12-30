import { Nade } from "../../models/Nade/Nade";
import { Layout } from "../../ui-common/layout/layout";
import { NadeTitlebar } from "./NadeTitlebar";
import { NadeMetaPanel } from "./NadeMeta/NadeMetaPanel";
import { NadeStatus } from "./NadeStatus/NadeStatus";
import { UserContainer } from "./UserContainer";
import { AdminEditor } from "./AdminEditor/AdminEditor";
import { useCanEditNade } from "../../store/NadeStore/NadeHooks";
import { GfycatPlayerContrainer } from "../../ui-common/GfycatPlayerContainer";
import { NadeDescription } from "./NadeDescription/NadeDescription";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  const { uiDimensions, isMobile } = useTheme();
  const allowEdit = useCanEditNade(nade);

  return (
    <Layout>
      <NadeTitlebar nade={nade} allowEdit={allowEdit} />
      <div className="nade-container">
        <div className="nade-main">
          <GfycatPlayerContrainer nade={nade} allowEdit={allowEdit} />
          <NadeDescription nade={nade} allowEdit={allowEdit} />
          <UserContainer user={nade.user} />
        </div>
        <div className="nade-aside">
          <NadeMetaPanel allowEdit={allowEdit} nade={nade} />
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <AdminEditor nade={nade} />
        </div>
      </div>
      <style jsx>
        {`
          .nade-container {
            display: flex;
            flex-direction: ${isMobile ? "column" : "row"};
            padding: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          }
          .nade-main {
            margin-right: ${isMobile ? 0 : uiDimensions.INNER_GUTTER_SIZE}px;
            margin-bottom: ${isMobile ? uiDimensions.INNER_GUTTER_SIZE : 0}px;
            flex: 1;
          }
          .nade-aside {
            width: 280px;
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
