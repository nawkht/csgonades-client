import { FC, lazy, memo, Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps/components/SignInWarning";
import { mapString } from "../models/Nade/CsGoMap";
import { nadeTypeString } from "../models/Nade/NadeType";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { useNade } from "../store2/NadePageStore/hooks/useNade";
import { useNadeRegisterView } from "../store2/NadePageStore/hooks/useNadeRegisterView";
import { FavoriteButton } from "./components/FavoriteButton";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeInfo } from "./components/NadeInfo";
import { NadeTitle } from "./components/NadeTitle";
import { ReportNadeButton } from "./components/ReportNadeButtons";
import { SimilarNades } from "./components/SimilarNades";
import { SEO } from "../layout/SEO2";

const AdminEditor = lazy(() => import("./admineditor2/AdminEditor"));
const TitleEditor = lazy(() => import("./editcontainers/TitleEditor"));
const DecriptionEditor = lazy(() =>
  import("./editcontainers/DescriptionEditor")
);
const MetaEditor = lazy(() => import("./editcontainers/MetaEditor"));
const MapPositionEditor = lazy(() => import("./components/MapPositionEditor"));
const NadeStatus = lazy(() => import("./components/NadeStatus"));

export const NadePage: FC = memo(() => {
  const isAdminOrMod = useIsAdminOrModerator();
  const nade = useNade();
  const registerView = useNadeRegisterView();
  const allowEdit = useCanEditNade(nade);
  const [editTitleVisisble, setEditTitleVisisble] = useState(false);
  const [editDescVisisble, setEditDescisisble] = useState(false);
  const [editMetaVisible, setEditMetaVisible] = useState(false);
  const [showSignInWarning, setShowSignInWarning] = useState(false);

  const allowEditTitle = allowEdit && nade.status !== "accepted";

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
      <SEO
        title={layoutTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.images.thumbnailUrl}
        nadeSeo={nade}
      />

      <div key={`nadepage-${nade.id}`}>
        {allowEdit && (
          <Suspense fallback={<div />}>
            <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          </Suspense>
        )}

        <div className="ez top-placement">
          <EzoicPlaceHolder
            key="Nade Page | Over title 2"
            id={131}
            height={60}
          />
        </div>

        <NadeBreadcrumb nade={nade} />
        <NadeTitle
          title={nade.title}
          map={nade.map}
          type={nade.type}
          onEditNade={() => setEditTitleVisisble(true)}
          allowEdit={allowEditTitle}
        />

        <div className="nade-page">
          <aside className="ez nade-page-aside">
            <EzoicPlaceHolder
              key="Nade page | Left sidebar"
              id={106}
              height={600}
            />
          </aside>
          <div className="nade-page-content">
            <ResponsiveVideo
              hdUrL={nade.gfycat.largeVideoUrl}
              sdUrl={nade.gfycat.smallVideoUrl}
              hdUrlWebm={nade.gfycat.largeVideoWebm}
              poster={nade.images.thumbnailUrl}
              controls={isMobile ? "mobile" : "desktop"}
            />

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

            <div className="ez placement-under-desc">
              <EzoicPlaceHolder
                key="Nade page | Under description"
                id={107}
                height={100}
              />
            </div>

            <div className="similar-nades">
              <SimilarNades nade={nade} />
            </div>
          </div>
          <aside className="ez nade-page-aside2">
            <EzoicPlaceHolder
              key="Nade page | Right sidebar"
              id={109}
              height={600}
            />
          </aside>
        </div>

        <div key={`hidden-${nade.id}`}>
          <SignInWarning
            visible={showSignInWarning}
            onDismiss={() => setShowSignInWarning(false)}
            message="favorite"
          />

          {allowEdit && (
            <Suspense fallback={<div />}>
              <TitleEditor
                nadeId={nade.id}
                title={nade.title}
                visisble={editTitleVisisble}
                onClose={() => setEditTitleVisisble(false)}
              />
            </Suspense>
          )}

          {allowEdit && (
            <Suspense fallback={<div />}>
              <DecriptionEditor
                visisble={editDescVisisble}
                nade={nade}
                onDismiss={() => setEditDescisisble(false)}
              />
            </Suspense>
          )}

          {allowEdit && (
            <Suspense fallback={<div />}>
              <MetaEditor
                visisble={editMetaVisible}
                nade={nade}
                onDismiss={() => setEditMetaVisible(false)}
              />
            </Suspense>
          )}

          {allowEdit && (
            <Suspense fallback={<div />}>
              <MapPositionEditor nade={nade} />
            </Suspense>
          )}

          {isAdminOrMod && (
            <Suspense fallback={<div />}>
              <AdminEditor nade={nade} />
            </Suspense>
          )}
        </div>
      </div>
      <style jsx>{`
        .nade-info-container {
          display: flex;
          margin-top: 30px;
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

        .nade-page {
          margin: 0 auto;
          max-width: calc(1100px + 200px + 200px + 40px + 40px);
          display: flex;
          padding-bottom: 50px;
          min-height: 85vh;
        }

        .ez {
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
