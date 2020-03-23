import { FC, lazy, memo, Suspense, useEffect, useState } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
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
import { NadeActions } from "./NadeActions";
import { NadeVideoContainer } from "./NadeVideoContainer";

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

      <div id="nade-page-grid">
        <aside id="sidebar-left">
          <div className="ez-300">
            <EzoicPlaceHolder id={132} />
          </div>
          <div className="ez-160">
            <EzoicPlaceHolder id={140} />
          </div>
        </aside>
        <aside id="sidebar-right">
          <div className="ez-300">
            <EzoicPlaceHolder id={133} />
          </div>
          <div className="ez-160">
            <EzoicPlaceHolder id={141} />
          </div>
        </aside>
        <div id="nade-page-main">
          <NadeVideoContainer nade={nade} />
          <NadeActions
            nade={nade}
            onShowSignInWarning={() => setShowSignInWarning(true)}
          />
          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
            onEditMeta={() => setEditMetaVisible(true)}
          />
        </div>
      </div>

      <div className="ad-bottom">
        <EzoicPlaceHolder id={136} />
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
        #nade-page-grid {
          display: grid;
          grid-template-columns: 300px 1fr 300px;
          grid-template-areas: "adleft main adright";
          max-width: 100%;
          grid-column-gap: ${Dimensions.GUTTER_SIZE};
          padding-top: 30px;
          max-width: calc((16 / 9 * 600px) + 300px + 300px + 60px);
          margin: 0 auto;
        }

        #nade-page-main {
          grid-area: main;
        }

        #sidebar-left {
          grid-area: adleft;
          display: flex;
          justify-content: space-around;
        }

        #sidebar-right {
          grid-area: adright;
          justify-content: space-around;
        }

        .ad-bottom {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
        }

        .ez-160 {
          display: none;
        }

        .title {
          padding-top: 50px;
        }

        @media only screen and (max-width: 1400px) {
          #nade-page-grid {
            grid-template-columns: 160px 1fr 160px;
            max-width: calc((16 / 9 * 600px) + 160px + 160px + 60px);
          }

          .ez-160 {
            display: block;
          }
          .ez-300 {
            display: none;
          }
        }

        @media only screen and (max-width: 1000px) {
          #nade-page-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "main";
            max-width: calc((16 / 9 * 600px));
            margin: 0 auto;
            padding-left: 30px;
            padding-right: 30px;
          }

          #sidebar-left,
          #sidebar-right {
            display: none;
          }
        }

        @media only screen and (max-width: 600px) {
          #nade-page-grid {
            padding-top: 0px;
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
});
