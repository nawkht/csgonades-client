import { FC, memo, useEffect, useState } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { SignInWarning } from "../maps/components/SignInWarning";
import { mapString } from "../models/Nade/CsGoMap";
import { nadeTypeString } from "../models/Nade/NadeType";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { useNade } from "../store2/NadePageStore/hooks/useNade";
import { useNadeRegisterView } from "../store2/NadePageStore/hooks/useNadeRegisterView";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeTitle, nadeTitleBuilder } from "./components/NadeTitle";
import { SEO } from "../layout/SEO2";
import { NadeInfoContainer } from "./NadeInfoContainer";
import { NadeVideoContainer } from "./NadeVideoContainer";
import { NadeShareActions } from "./NadeShareActions";
import { NadeComments } from "./comments/NadeComments";
import NadeStatus from "./components/NadeStatus";
import TitleEditor from "./editcontainers/TitleEditor";
import DecriptionEditor from "./editcontainers/DescriptionEditor";
import MetaEditor from "./editcontainers/MetaEditor";
import MapPositionEditor from "./components/MapPositionEditor";
import AdminEditor from "./admineditor2/AdminEditor";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify } from "../utils/Common";
import { NadeMeta } from "./components/NadeMeta";
import { FavoriteButton } from "./components/FavoriteButton";
import { ReportNadeButton } from "./components/ReportNadeButtons";

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
      <ArticleJsonLd
        url={`https://www.csgonades.com/nades/${nade?.slug || nade?.id}`}
        title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
        authorName={nade?.user.nickname}
        datePublished={nade?.createdAt}
        images={[nade?.images.thumbnailUrl]}
        description={descriptionSimplify(nade?.description)}
        publisherName={"CSGO Nades"}
        publisherLogo={"https://www.csgonades.com/logo.png"}
      />
      <SEO
        title={layoutTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.images.thumbnailUrl}
      />

      {allowEdit && (
        <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
      )}

      <div id="nade-page-grid">
        <div id="miniad">
          <EzoicPlaceHolder id={156} />
        </div>

        <div id="title">
          <NadeBreadcrumb nade={nade} />
          <NadeTitle
            title={nade.title}
            map={nade.map}
            type={nade.type}
            onEditNade={() => setEditTitleVisisble(true)}
            allowEdit={allowEditTitle}
          />
        </div>

        <aside id="sidebar-right">
          <NadeMeta nade={nade} onEditMeta={() => setEditMetaVisible(true)} />

          <div id="side-bar-ad">
            <EzoicPlaceHolder id={161} />
          </div>
        </aside>

        <div id="nade-page-main">
          <NadeVideoContainer nade={nade} />
        </div>

        <div id="nade-info-container">
          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
          />
        </div>

        <div id="nade-actions">
          <div className="action">
            <NadeShareActions
              title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
              visisble={nade?.status === "accepted"}
              url={`/nades/${nade?.slug || nade?.id}`}
              image={nade?.images.thumbnailUrl}
            />
          </div>

          <div className="action">
            <FavoriteButton
              showSignInWarning={() => setShowSignInWarning(true)}
              nade={nade}
            />
          </div>

          <div className="action">
            <ReportNadeButton nadeId={nade.id} />
          </div>
        </div>

        <div id="nade-comment-container">
          <NadeComments nadeId={nade.id} />
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
        <TitleEditor
          nadeId={nade.id}
          title={nade.title}
          visisble={editTitleVisisble}
          onClose={() => setEditTitleVisisble(false)}
        />
      )}

      {allowEdit && (
        <DecriptionEditor
          visisble={editDescVisisble}
          nade={nade}
          onDismiss={() => setEditDescisisble(false)}
        />
      )}

      {allowEdit && (
        <MetaEditor
          visisble={editMetaVisible}
          nade={nade}
          onDismiss={() => setEditMetaVisible(false)}
        />
      )}

      {allowEdit && <MapPositionEditor nade={nade} />}

      {isAdminOrMod && <AdminEditor nade={nade} />}

      <style jsx>{`
        #nade-page-grid {
          display: grid;
          grid-template-columns: auto 110px 160px 160px;
          grid-template-areas:
            "title miniad miniad miniad"
            "main main main sidebar"
            "info info actions sidebar"
            "comments comments . sidebar";
          max-width: 100%;
          grid-column-gap: 40px;
          grid-row-gap: 40px;
          max-width: 1260px;
          margin: 0 auto;
          padding-left: 30px;
          padding-right: 30px;
          padding-top: 40px;
        }

        #nade-info-container {
          grid-area: info;
        }

        #nade-page-main {
          grid-area: main;
        }

        #sidebar-right {
          grid-area: sidebar;
        }

        #nade-actions {
          grid-area: actions;
        }

        #nade-actions .action {
          max-width: 160px;
          margin-bottom: 30px;
        }

        #nade-comment-container {
          grid-area: comments;
        }

        .ad-bottom {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
        }

        #title {
          grid-area: title;
        }

        #side-bar-ad {
          margin-top: 30px;
        }

        #miniad {
          grid-area: miniad;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }

        .eztest {
          height: 60px;
          width: 468px;
          background: #ccc;
        }

        @media only screen and (max-width: 1000px) {
          #nade-page-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "miniad miniad"
              "title title"
              "main main"
              "actions actions"
              "info info"
              "sidebar sidebar"
              "comments comments";
          }

          #miniad {
            justify-content: center;
          }

          #side-bar-ad {
            display: none;
          }

          #nade-actions {
            grid-area: actions;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 0 auto;
          }

          #nade-actions .action {
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 0px;
            width: 160px;
          }
        }

        @media only screen and (max-width: 600px) {
          #nade-page-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "miniad miniad"
              "title title"
              "main main"
              "info info"
              "actions actions"
              "sidebar sidebar"
              "comments comments";
            padding-left: 15px;
            padding-right: 15px;
          }

          #nade-actions {
            grid-area: actions;
            display: block;
            margin: 0 auto;
          }

          #nade-actions .action {
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            width: 160px;
          }
        }
      `}</style>
    </>
  );
});
