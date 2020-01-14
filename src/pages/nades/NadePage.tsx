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
import { mapString } from "../../models/Nade/CsGoMap";
import { nadeTypeString } from "../../models/Nade/NadeType";
import { useTryShowFavoriteTooltip } from "../../store/NotificationStore/NotificationHooks";
import { MapPositionEditor } from "./MapPositionEditor/MapPositionEditor";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  useTryShowFavoriteTooltip();
  const { uiDimensions } = useTheme();
  const allowEdit = useCanEditNade(nade);

  let layoutTitle = "New nade";

  if (nade.title && nade.map && nade.type) {
    layoutTitle = `${nade.title} - ${mapString(nade.map)} - ${nadeTypeString(
      nade.type
    )}`;
  }

  return (
    <Layout
      title={layoutTitle}
      description={nade.description}
      canonical={`/nades/${nade.id}`}
      metaThumbNail={nade.images.largeUrl}
    >
      <NadeTitlebar nade={nade} allowEdit={allowEdit} />
      <div className="nade-container">
        <div className="nade-main">
          <GfycatPlayerContrainer nade={nade} allowEdit={allowEdit} />
          <NadeDescription nade={nade} allowEdit={allowEdit} />
          <UserContainer nade={nade} />
        </div>
        <div className="nade-aside">
          <NadeMetaPanel allowEdit={allowEdit} nade={nade} />
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <MapPositionEditor nade={nade} />
          <AdminEditor nade={nade} />
        </div>
      </div>
      <style jsx>
        {`
          .nade-container {
            display: flex;
            flex-direction: row;
            padding: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          }
          .nade-main {
            margin-right: ${uiDimensions.INNER_GUTTER_SIZE}px;
            margin-bottom: 0;
            flex: 1;
          }
          .nade-aside {
            width: 280px;
          }

          @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
            .nade-container {
              flex-direction: column;
            }

            .nade-main {
              margin-right: 0;
              margin-bottom: ${uiDimensions.INNER_GUTTER_SIZE}px;
            }

            .nade-aside {
              width: 100%;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
