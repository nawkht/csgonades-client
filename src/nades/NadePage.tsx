import { FC, memo, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../common/layout/Layout2";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps/components/SignInWarning";
import { mapString } from "../models/Nade/CsGoMap";
import { nadeTypeString } from "../models/Nade/NadeType";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { useNade, useNadeRegisterView } from "../store2/NadePageStore/hooks";
import { AdminEditor } from "./admineditor2/AdminEditor";
import { FavoriteButton } from "./components/FavoriteButton";
import { MapPositionEditor } from "./components/MapPositionEditor";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeInfo } from "./components/NadeInfo";
import { NadeStatus } from "./components/NadeStatus";
import { NadeTitle } from "./components/NadeTitle";
import { ReportNadeButton } from "./components/ReportNadeButtons";
import { SimilarNades } from "./components/SimilarNades";
import { DecriptionEditor } from "./editcontainers/DescriptionEditor";
import { MetaEditor } from "./editcontainers/MetaEditor";
import { TitleEditor } from "./editcontainers/TitleEditor";

export const NadePage: FC = memo(() => {
  const nade = useNade();
  const registerView = useNadeRegisterView();
  const allowEdit = useCanEditNade(nade);
  const [editTitleVisisble, setEditTitleVisisble] = useState(false);
  const [editDescVisisble, setEditDescisisble] = useState(false);
  const [editMetaVisible, setEditMetaVisible] = useState(false);
  const [showSignInWarning, setShowSignInWarning] = useState(false);

  useEffect(() => {
    registerView(nade.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nade.id]);

  let layoutTitle = "New nade";

  if (nade.title && nade.map && nade.type) {
    layoutTitle = `${nade.title} - ${mapString(nade.map)} - ${nadeTypeString(
      nade.type
    )}`;
  }

  return (
    <>
      <Layout2
        title={layoutTitle}
        description={nade.description}
        canonical={`/nades/${nade.id}`}
        metaThumbNail={nade.images.thumbnailUrl}
      >
        <EzoicLoader codes={[108, 106, 107, 109]} />
        <div key={`nadepage-${nade.id}`}>
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          <NadeBreadcrumb nade={nade} />
          <NadeTitle
            title={nade.title}
            map={nade.map}
            type={nade.type}
            onEditNade={() => setEditTitleVisisble(true)}
            allowEdit={allowEdit}
          />

          <div className="nade-page">
            <aside className="nade-page-aside">
              <EzoicPlaceHolder id={106} />
            </aside>
            <div className="nade-page-content">
              <ResponsiveVideo
                hdUrL={nade.gfycat.largeVideoUrl}
                sdUrl={nade.gfycat.smallVideoUrl}
                hdUrlWebm={nade.gfycat.largeVideoWebm}
                poster={nade.images.thumbnailUrl}
                controls={isMobile ? "mobile" : "desktop"}
              />

              <div className="nade-page-header-placeholder">
                <EzoicPlaceHolder id={108} />
              </div>

              <div className="nade-info-container">
                <div className="nade-info-empty"></div>
                <div className="nade-info-description">
                  <NadeInfo
                    nade={nade}
                    onEditTitle={() => setEditDescisisble(true)}
                    onEditMeta={() => setEditMetaVisible(true)}
                  />
                </div>
                <div className="nade-info-actions">
                  <FavoriteButton
                    showSignInWarning={() => setShowSignInWarning(true)}
                    nade={nade}
                  />
                  <ReportNadeButton nadeId={nade.id} />
                </div>
              </div>

              <div className="placement-under-desc">
                <EzoicPlaceHolder id={107} />
              </div>

              <div className="similar-nades">
                <SimilarNades nade={nade} />
              </div>
            </div>
            <aside className="nade-page-aside2">
              <EzoicPlaceHolder id={109} />
            </aside>
          </div>

          <div key={`hidden-${nade.id}`}>
            <SignInWarning
              visible={showSignInWarning}
              onDismiss={() => setShowSignInWarning(false)}
              message="favorite"
            />

            <TitleEditor
              nadeId={nade.id}
              title={nade.title}
              visisble={editTitleVisisble}
              onClose={() => setEditTitleVisisble(false)}
            />

            <DecriptionEditor
              visisble={editDescVisisble}
              nade={nade}
              onDismiss={() => setEditDescisisble(false)}
            />

            <MetaEditor
              visisble={editMetaVisible}
              nade={nade}
              onDismiss={() => setEditMetaVisible(false)}
            />

            <MapPositionEditor nade={nade} />

            <AdminEditor nade={nade} />
          </div>
        </div>
      </Layout2>
      <style jsx>{`
        .nade-info-container {
          display: flex;
        }

        .nade-info-actions {
          width: 160px;
        }

        .nade-info-description {
          margin-left: 160px;
          padding-left: 30px;
          padding-right: 30px;
          flex: 1;
        }

        .sticky {
          max-height: 1200px;
          min-height: 600px;
        }

        .placement-under-desc {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .nade-page-aside,
        .nade-page-aside2,
        .nade-page-header-placeholder {
        }

        .nade-page-header-placeholder {
          margin-top: 20px;
          margin-bottom: 20px;
          height: 60px;
        }

        .nade-page {
          margin: 0 auto;
          max-width: calc(1100px + 200px + 200px + 40px + 40px);
          display: flex;
          padding-bottom: 50px;
          min-height: 85vh;
        }

        .nade-page-aside,
        .nade-page-aside2 {
          min-height: 600px;
          max-height: 1200px;
        }

        .nade-page-aside {
          margin-right: 40px;
          width: 200px;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .nade-page-aside2 {
          margin-left: 40px;
          width: 200px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
        }

        .nade-page-content {
          flex: 1;
          max-width: 1100px;
        }

        .action-container {
          display: flex;
          max-width: 850px;
          margin: 0 auto;
          padding-top: 20px;
          padding-bottom: 10px;
        }

        .empty-container {
          flex: 1;
          margin-right: 20px;
        }

        @media only screen and (max-width: ${Dimensions.TABLET_THRESHHOLD}) {
          .nade-page-aside,
          .nade-page-aside2 {
            display: none;
          }

          .similar-nades {
            margin-left: 30px;
            margin-right: 30px;
          }

          .nade-info-container {
            margin-left: 30px;
            margin-right: 30px;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nade-page-aside,
          .nade-page-aside2 {
            display: none;
          }

          .similar-nades {
            margin-left: 30px;
            margin-right: 30px;
          }

          .nade-info-container {
            flex-direction: column;
          }

          .nade-info-description {
            margin-left: 0;
          }

          .nade-info-actions {
            flex-direction: column;
            width: 100%;
            padding: 30px;
          }
        }
      `}</style>
    </>
  );
});
