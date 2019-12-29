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
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  const theme = useTheme();
  const allowEdit = useCanEditNade(nade);

  return (
    <Layout>
      <NadeTitlebar nade={nade} allowEdit={allowEdit} />
      <div className="nade-container">
        <div className="nade-main">
          <GfycatPlayerContrainer nade={nade} allowEdit={allowEdit} />
          <NadeDescription nade={nade} allowEdit={allowEdit} />
        </div>
        <div className="nade-aside">
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <NadeMetaPanel allowEdit={allowEdit} nade={nade} />
          <UserContainer user={nade.user} marginTop={18 * 3} />
          <AdminEditor nade={nade} />
        </div>
      </div>
      <style jsx>
        {`
          .nade-container {
            display: flex;
            flex-direction: ${theme.isMobile ? "column" : "row"};
            padding: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          }
          .nade-main {
            margin-right: ${theme.isMobile
              ? 0
              : theme.uiDimensions.INNER_GUTTER_SIZE}px;
            margin-bottom: ${theme.isMobile
              ? theme.uiDimensions.INNER_GUTTER_SIZE
              : 0}px;
          }
          .nade-aside {
            min-width: 280px;
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
