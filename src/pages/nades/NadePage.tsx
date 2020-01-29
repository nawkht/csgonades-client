import { Dimensions } from "../../constants/Constants";
import { mapString } from "../../models/Nade/CsGoMap";
import { Nade } from "../../models/Nade/Nade";
import { nadeTypeString } from "../../models/Nade/NadeType";
import { useCanEditNade } from "../../store/NadeStore/NadeHooks";
import { useShowFavoriteTip } from "../../store/TipStore/TipHooks";
import { GfycatPlayerContrainer } from "../../ui-common/GfycatPlayerContainer";
import { Layout } from "../../ui-common/Layout";
import { AdminEditor } from "./AdminEditor/AdminEditor";
import { FavoriteButton } from "./FavoriteButton";
import { MapPositionEditor } from "./MapPositionEditor/MapPositionEditor";
import { NadeDescription } from "./NadeDescription/NadeDescription";
import { NadeMetaPanel } from "./NadeMeta/NadeMetaPanel";
import { NadeStatus } from "./NadeStatus/NadeStatus";
import { NadeTitlebar } from "./NadeTitlebar";
import { ReportButton } from "./ReportButton";
import { SimilarNades } from "./SimilarNades";
import { UserContainer } from "./UserContainer";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  useShowFavoriteTip();
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
      metaThumbNail={nade.images.thumbnailUrl}
    >
      <div className="nade-page">
        <div className="n-title">
          <NadeTitlebar
            key={`title-${nade.id}`}
            nade={nade}
            allowEdit={allowEdit}
          />
        </div>

        <div className="n-stats">
          <NadeMetaPanel
            key={`meta-${nade.id}`}
            allowEdit={allowEdit}
            nade={nade}
          />
          <NadeStatus
            key={`status-${nade.id}`}
            status={nade.status}
            statusInfo={nade.statusInfo}
          />

          <div className="n-actions">
            <div className="n-action-row">
              <FavoriteButton key={`fav-${nade.id}`} nade={nade} />
              <ReportButton key={`rep-${nade.id}`} nadeId={nade.id} />
            </div>

            <div className="n-action-row">
              <MapPositionEditor key={`pos-${nade.id}`} nade={nade} />
              <AdminEditor key={`admin-${nade.id}`} nade={nade} />
            </div>
          </div>
        </div>

        <div className="n-video">
          <GfycatPlayerContrainer
            key={`gfy-${nade.id}`}
            nade={nade}
            allowEdit={allowEdit}
          />
        </div>
        <div className="n-description">
          <NadeDescription
            key={`desc-${nade.id}`}
            nade={nade}
            allowEdit={allowEdit}
          />
          <UserContainer key={`user-${nade.id}`} nade={nade} />
        </div>

        <div className="n-similar">
          <SimilarNades key={`sim-${nade.id}`} nade={nade} />
        </div>
      </div>

      <style jsx>
        {`
          .nade-page {
            display: grid;
            grid-template-columns: auto auto 300px;
            grid-template-rows: auto auto auto auto auto;
            grid-template-areas:
              "title title title"
              "video video stats"
              "video video stats"
              "desc desc stats"
              "sim sim sim";
            grid-column-gap: ${Dimensions.GUTTER_SIZE};
            margin: ${Dimensions.GUTTER_SIZE};
          }

          .n-title {
            grid-area: title;
          }
          .n-video {
            grid-area: video;
          }

          .n-stats {
            grid-area: stats;
          }

          .n-description {
            grid-area: desc;
          }

          .n-similar {
            grid-area: sim;
          }

          .n-action-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 18px;
          }

          @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
            .nade-page {
              grid-template-columns: 50% 50%;
              grid-template-rows: auto auto auto auto auto auto;
              grid-template-areas:
                "title title"
                "video video"
                "video video"
                "desc desc"
                "stats stats"
                "sim sim";
              grid-column-gap: 0;
              margin: 18px;
            }

            .n-stats {
              margin-top: 18px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
