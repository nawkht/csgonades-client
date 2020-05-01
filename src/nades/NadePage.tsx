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
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SidebarPanel } from "../common/SidebarPanel";
import { AdUnit } from "../common/adunits/AdUnit";

export const NadePage: FC = memo(() => {
  const { colors } = useTheme();
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
        key={`ld-${nade.id}`}
        url={`https://www.csgonades.com/nades/${nade?.slug || nade?.id}`}
        title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
        authorName={nade?.user.nickname}
        datePublished={nade?.createdAt}
        dateModified={nade?.updatedAt}
        images={[nade?.images.thumbnailUrl]}
        description={descriptionSimplify(nade?.description)}
        publisherName={"CSGO Nades"}
        publisherLogo={"https://www.csgonades.com/logo.png"}
      />
      <SEO
        key={`seo-${nade.id}`}
        title={layoutTitle}
        description={nade.description}
        canonical={`/nades/${nade.slug || nade.id}`}
        thumbnail={nade.images.thumbnailUrl}
      />

      <aside id="nadepage-sidebar" key={`aside-${nade.id}`}>
        <div id="nadepage-sidebar-content">
          <SidebarPanel first title="SHARE">
            <NadeShareActions
              title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
              visisble={nade?.status === "accepted"}
              url={`/nades/${nade?.slug || nade?.id}`}
              image={nade?.images.thumbnailUrl}
            />
          </SidebarPanel>

          <SidebarPanel last title="ACTIONS">
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
          </SidebarPanel>

          <div className="ph-unit">
            <AdUnit tagType="300x250" />
          </div>
        </div>
      </aside>

      <div id="nade-page-grid" key={`main-${nade.id}`}>
        {nade?.tickrate === "tick128" && (
          <div className="matchmake-warning">
            <div className="warning-title">WARNING</div>
            <div>
              Will not work, or be suboptimal if you play matchmaking. This nade
              is made for 128 tick servers.
            </div>
          </div>
        )}

        <div id="title">
          {allowEdit && (
            <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />
          )}
          <NadeBreadcrumb nade={nade} />
          <NadeTitle
            title={nade.title}
            map={nade.map}
            type={nade.type}
            onEditNade={() => setEditTitleVisisble(true)}
            allowEdit={allowEditTitle}
          />
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

        <div id="misc">
          {allowEdit && <MapPositionEditor nade={nade} />}
          {isAdminOrMod && <AdminEditor nade={nade} />}
        </div>
      </div>

      <SignInWarning
        key={`1-${nade.id}`}
        visible={showSignInWarning}
        onDismiss={() => setShowSignInWarning(false)}
        message="favorite"
      />

      {allowEdit && (
        <TitleEditor
          key={`2-${nade.id}`}
          nadeId={nade.id}
          title={nade.title}
          visisble={editTitleVisisble}
          onClose={() => setEditTitleVisisble(false)}
        />
      )}

      {allowEdit && (
        <DecriptionEditor
          key={`3-${nade.id}`}
          visisble={editDescVisisble}
          nade={nade}
          onDismiss={() => setEditDescisisble(false)}
        />
      )}

      {allowEdit && (
        <MetaEditor
          key={`4-${nade.id}`}
          visisble={editMetaVisible}
          nade={nade}
          onDismiss={() => setEditMetaVisible(false)}
        />
      )}

      <style jsx>{`
        .matchmake-warning {
          grid-area: warning;
          background: #d97e00;
          color: white;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding: 10px 20px;
          display: flex;
        }

        .warning-title {
          font-weight: 400;
          margin-right: 8px;
        }

        .ph-unit {
        }

        .share-label {
          background: ${colors.DP01};
          padding: 15px 20px 15px 20px;
          font-weight: normal;
          font-size: 14px;
        }

        #share-buttons {
          padding: 15px 30px 30px 30px;
        }

        #nadepage-sidebar-content {
          position: sticky;
          top: calc(65px);
        }

        #nadepage-sidebar {
          grid-area: sidebar;
          width: 300px;
          background: ${colors.DP02};
        }

        #misc {
          grid-area: misc;
        }

        #nade-page-grid {
          margin: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr 1fr 200px;
          grid-template-areas:
            "title title title"
            "warning warning warning"
            "video video video"
            "info info meta"
            "comments comments ."
            "misc misc misc";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          max-width: 1200px;
        }

        .half-page-plactement {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
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
          grid-area: video;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #sidebar-right {
          grid-area: sidebar;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-buttons {
          display: flex;
          justify-content: space-between;
        }

        #nade-buttons .nade-btn {
          width: 47%;
        }

        #nade-comment-container {
          grid-area: comments;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #placement-bottom {
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        #title {
          grid-area: title;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #side-bar-ad {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        @media only screen and (max-width: 1210px) {
          #nade-page-grid {
            margin-right: 30px;
          }

          #nadepage-sidebar {
            width: 100%;
          }
        }

        @media only screen and (max-width: 910px) {
          #nade-page-grid {
            margin-left: 15px;
            margin-right: 15px;
          }
        }

        @media only screen and (max-width: 800px) {
          #nade-page-grid {
            grid-template-columns: 1fr 200px 1fr;
            grid-template-areas:
              "title title title"
              "video video video"
              "info info info"
              ". meta ."
              "comments comments comments"
              "misc misc misc";
          }
        }

        @media only screen and (max-width: 400px) {
          #nade-page-main {
            margin-left: -15px;
            margin-right: -15px;
          }
        }
      `}</style>
    </>
  );
});
