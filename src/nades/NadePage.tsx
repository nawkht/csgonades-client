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
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeTitle } from "./components/NadeTitle";
import { SEO } from "../layout/SEO2";
import { NadeInfoContainer } from "./NadeInfoContainer";

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

      {allowEdit && (
        <Suspense fallback={<div />}>
          <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
        </Suspense>
      )}

      <div className="nade-page2">
        <div className="title">
          <NadeBreadcrumb nade={nade} />
          <NadeTitle
            title={nade.title}
            map={nade.map}
            type={nade.type}
            onEditNade={() => setEditTitleVisisble(true)}
            allowEdit={allowEditTitle}
          />
        </div>

        <div className="video">
          <ResponsiveVideo
            hdUrL={nade.gfycat.largeVideoUrl}
            sdUrl={nade.gfycat.smallVideoUrl}
            hdUrlWebm={nade.gfycat.largeVideoWebm}
            poster={nade.images.thumbnailUrl}
            controls={isMobile ? "mobile" : "desktop"}
          />
        </div>
        <div className="info">
          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
            onEditMeta={() => setEditMetaVisible(true)}
            onShowSignInWarning={() => setShowSignInWarning(true)}
          />
          <EzoicPlaceHolder key="	Nade Page | Under info" id={136} />
        </div>

        <div className="ad-left-video">
          <EzoicPlaceHolder
            key="Nade Page | Left video 2"
            id={132}
            height={600}
          />
        </div>

        <div className="ad-right-video">
          <EzoicPlaceHolder key="Nade Page | Right video 2" id={133} />
        </div>

        <div className="ad-left-info">
          <EzoicPlaceHolder
            key="	Nade Page | Left info 2"
            id={134}
            height={600}
          />
        </div>
        <div className="ad-right-info">
          <EzoicPlaceHolder key="Nade Page | Right info 2" id={135} />
        </div>
      </div>

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
      <style jsx>{`
        .nade-page2 {
          display: grid;
          grid-template-columns: 160px 160px 1fr 1fr 1fr 1fr 160px 160px;
          grid-template-rows: auto auto auto auto;
          grid-row-gap: ${Dimensions.GUTTER_SIZE};
          grid-template-areas:
            "title title title title title title title title"
            "ad ad video video video video ad2 ad2"
            "ad ad info info info info ad2 ad2"
            "ad3 ad3 info info info info ad4 ad4";
          margin-left: 10px;
          margin-right: 10px;
        }

        .title {
          grid-area: title;
          margin-top: 40px;
        }

        .video {
          grid-area: video;
          padding-left: 30px;
          padding-right: 30px;
        }

        .info {
          grid-area: info;
          padding-left: 30px;
          padding-right: 30px;
        }

        .ad-left-video {
          grid-area: ad;
        }

        .ad-right-video {
          grid-area: ad2;
        }

        .ad-left-info {
          grid-area: ad3;
        }

        .ad-right-info {
          grid-area: ad4;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        @media only screen and (max-width: 1910px) {
          .nade-page2 {
            grid-template-rows: auto auto auto auto auto;
            grid-template-areas:
              "title title title title title title title title"
              "ad video video video video video video ad2"
              "ad . info info info info . ad2"
              "ad3 ad3 info info info info ad4 ad4";
          }
        }

        @media only screen and (max-width: 1280px) {
          .nade-page2 {
            grid-template-rows: auto auto auto auto auto;
            grid-template-areas:
              "title title title title title title title title"
              "ad video video video video video video ad2"
              "ad info info info info info info ad2"
              "ad3 info info info info info info ad4"
              "ad3 info info info info info info ad4";
          }
        }

        @media only screen and (max-width: 1024px) {
          .nade-page2 {
            grid-template-rows: auto auto auto auto;
            grid-row-gap: ${Dimensions.GUTTER_SIZE};
            grid-template-areas:
              "title title title title title title title title"
              "video video video video video video video video"
              "ad info info info info info info ad2"
              "ad info info info info info info ad2";
          }

          .ad-left-info,
          .ad-right-info {
            display: none;
          }

          .video {
            padding: 0;
          }
        }

        @media only screen and (max-width: 950px) {
          .nade-page2 {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            grid-row-gap: ${Dimensions.GUTTER_SIZE};
            grid-template-areas:
              "title title title title title title title title"
              "video video video video video video video video"
              "info info info info info info info info"
              "info info info info info info info info";
          }

          .ad-left-video,
          .ad-right-video,
          .ad-left-info,
          .ad-right-info {
            display: none;
          }

          .info {
            padding: 0;
          }
        }
      `}</style>
    </>
  );
});
