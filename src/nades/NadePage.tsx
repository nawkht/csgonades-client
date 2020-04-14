import { FC, memo, useEffect, useState } from "react";
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
import { Dimensions } from "../constants/Constants";

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
    <div key={nade.id}>
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
          <div id="side-bar-ad">
            <div id="60796-2">
              <script src="//ads.themoneytizer.com/s/gen.js?type=2"></script>
              <script src="//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=2"></script>
            </div>
          </div>
        </aside>

        <div id="nade-actions">
          <div id="nade-social">
            <NadeShareActions
              title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
              visisble={nade?.status === "accepted"}
              url={`/nades/${nade?.slug || nade?.id}`}
              image={nade?.images.thumbnailUrl}
            />
          </div>

          <div id="nade-buttons">
            <div className="nade-btn">
              <FavoriteButton
                showSignInWarning={() => setShowSignInWarning(true)}
                nade={nade}
              />
            </div>
            <div className="nade-btn">
              <ReportNadeButton nadeId={nade.id} />
            </div>
          </div>
        </div>

        <div id="nade-meta">
          <NadeMeta nade={nade} onEditMeta={() => setEditMetaVisible(true)} />
        </div>

        <div id="nade-page-main">
          <NadeVideoContainer nade={nade} />
        </div>

        <div id="nade-info-container">
          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
          />
        </div>

        <div id="nade-comment-container">
          <NadeComments nadeId={nade.id} />
        </div>

        <div id="placement-bottom"></div>
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
          grid-template-columns: auto 110px 160px 300px;
          grid-template-areas:
            "title title title ."
            "main main main sidebar"
            "actions actions actions sidebar"
            "info info meta sidebar"
            "comments comments . sidebar"
            "slot2 slot2 . sidebar";
          max-width: 100%;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          max-width: ${Dimensions.PAGE_WIDTH + 2 * Dimensions.GUTTER_SIZE}px;
          margin: 0 auto;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-meta {
          grid-area: meta;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-info-container {
          grid-area: info;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-page-main {
          grid-area: main;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #sidebar-right {
          grid-area: sidebar;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-actions {
          grid-area: actions;
          display: flex;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-social {
          flex: 1;
        }

        #nade-buttons {
          display: flex;
        }

        #nade-buttons .nade-btn {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
          min-width: 160px;
        }

        #nade-comment-container {
          grid-area: comments;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #placement-bottom {
          grid-area: slot2;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #title {
          grid-area: title;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #side-bar-ad {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        @media only screen and (max-width: 1000px) {
          #nade-page-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "title title"
              "main main"
              "actions actions"
              "info info"
              "meta meta"
              "slot2 slot2"
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
              "title title"
              "main main"
              "info info"
              "meta meta"
              "actions actions"
              "sidebar sidebar"
              "comments comments"
              "slot2 slot2";
            padding-left: 15px;
            padding-right: 15px;
          }

          #nade-actions {
            align-items: center;
            flex-direction: column;
          }

          #nade-buttons {
            align-items: center;
            flex-direction: column;
          }

          #nade-buttons .nade-btn {
            margin-top: ${Dimensions.GUTTER_SIZE / 2}px;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
});
