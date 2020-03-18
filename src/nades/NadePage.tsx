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

      {false && (
        <EzoicPlaceHolder
          key={"Nade Page | Under page title mobile"}
          id={137}
        />
      )}

      <NadeVideoContainer nade={nade} />

      <NadeActions
        nade={nade}
        onShowSignInWarning={() => setShowSignInWarning(true)}
      />

      <div className="nade-info">
        <div className="info">
          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
            onEditMeta={() => setEditMetaVisible(true)}
          />
        </div>

        <div className="ad-left-info">
          <EzoicPlaceHolder key="	Nade Page | Left info 2" id={134} />
        </div>
        <div className="ad-right-info">
          <EzoicPlaceHolder key="Nade Page | Right info 2" id={135} />
        </div>
      </div>

      <div className="ad-bottom">
        <EzoicPlaceHolder key="	Nade Page | Under info" id={136} />
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
        .nade-info {
          display: grid;
          grid-template-columns: 300px 1fr 300px;
          grid-template-areas: "adleft info adright";
          grid-column-gap: ${Dimensions.GUTTER_SIZE};
          max-width: 1360px;
          margin: 0 auto;
        }

        .title {
          margin-top: 40px;
        }

        .info {
          grid-area: info;
          margin-bottom: 30px;
        }

        .ad-left-info {
          grid-area: adleft;
          overflow: hidden;
        }

        .ad-right-info {
          grid-area: adright;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          overflow: hidden;
        }

        .ad-bottom {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
        }

        @media only screen and (max-width: 1280px) {
          .nade-info {
            grid-template-columns: 160px 1fr 160px;
            grid-template-areas: "adleft info adright";
            max-width: 1080px;
          }
        }

        @media only screen and (max-width: 768px) {
          .nade-info {
            grid-template-columns: 1fr;
            grid-template-areas: "info";
            max-width: 90vw;
          }

          .ad-left-info,
          .ad-right-info {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
