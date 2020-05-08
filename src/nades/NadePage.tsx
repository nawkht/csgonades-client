import { FC, memo } from "react";
import { useNade } from "../store2/NadePageStore/hooks/useNade";
import { NadeTitle } from "./components/NadeTitle";
import { SEO } from "../layout/SEO2";
import { NadeInfoContainer } from "./NadeInfoContainer";
import { NadeVideoContainer } from "./NadeVideoContainer";
import { NadeShareActions } from "./NadeShareActions";
import { NadeComments } from "./comments/NadeComments";
import NadeStatus from "./components/NadeStatus";
import { ArticleJsonLd } from "next-seo";
import { descriptionSimplify, generateTitle } from "../utils/Common";
import { NadeMeta } from "./components/NadeMeta";
import { FavoriteButton } from "./components/FavoriteButton";
import { ReportNadeButton } from "./components/ReportNadeButtons";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { PageCentralize } from "../common/PageCentralize";
import { AdUnit } from "../common/adunits/AdUnit";
import { FaChevronLeft } from "react-icons/fa";
import { useAnalytics } from "../utils/Analytics";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";

export const NadePage: FC = memo(() => {
  const { event } = useAnalytics();
  const { colors } = useTheme();
  const nade = useNade();
  const canEdit = useCanEditNade(nade);

  function onBackClick() {
    event({
      category: "NadePage",
      action: "Back Clicked",
    });
    window.history.back();
  }

  if (!nade) {
    return null;
  }

  const layoutTitle = generateTitle(
    nade.title,
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay
  );

  return (
    <>
      <ArticleJsonLd
        key={`ld-${nade.id}`}
        url={`https://www.csgonades.com/nades/${nade.slug || nade.id}`}
        title={layoutTitle}
        authorName={addslashes(nade.user.nickname)}
        datePublished={nade.createdAt}
        dateModified={nade.updatedAt}
        images={[nade.images.thumbnailUrl]}
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

      <PageCentralize>
        <NadeStatus status={nade.status} statusInfo={nade.statusInfo} />

        <div id="nade-page-grid" key={`main-${nade.id}`}>
          {nade?.tickrate === "tick128" && (
            <div className="matchmake-warning">
              <div className="warning-msg">
                <div className="warning-title">WARNING</div>
                <div>
                  Will not work, or be suboptimal if you play matchmaking. This
                  nade is made for 128 tick servers.
                </div>
              </div>
            </div>
          )}

          <div id="title">
            <div id="back">
              <button onClick={onBackClick}>
                <FaChevronLeft />
              </button>
            </div>
            <NadeTitle
              title={layoutTitle}
              canEdit={canEdit}
              nadeId={nade.id}
              nadeSlug={nade.slug}
            />
          </div>

          <div id="nade-meta">
            <NadeMeta nade={nade} />
          </div>

          <div id="nade-page-main">
            <NadeVideoContainer nade={nade} />
          </div>

          <div id="nade-info-container">
            <NadeInfoContainer nade={nade} />
          </div>

          <div id="nade-comment-container">
            <NadeComments nadeId={nade.id} />
          </div>

          <div id="placement">
            <AdUnit tagType="728x90" />
          </div>

          <div id="nade-actions">
            <div className="nade-action">
              <NadeShareActions
                title={generateTitle(
                  nade.title,
                  nade.startPosition,
                  nade.endPosition,
                  nade.type,
                  nade.oneWay
                )}
                visisble={nade.status === "accepted"}
                url={`/nades/${nade?.slug || nade?.id}`}
                image={nade.images.thumbnailUrl}
              />
            </div>

            <div className="nade-action">
              <FavoriteButton nade={nade} />
            </div>
            <div className="nade-action">
              <ReportNadeButton nadeId={nade.id} />
            </div>
          </div>
        </div>
      </PageCentralize>

      <style jsx>{`
        #back button {
          color: ${colors.TEXT};
          font-size: 24px;
          padding: 10px 20px;
          display: block;
          position: relative;
          top: 2px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
        }

        .matchmake-warning {
          grid-area: warning;
          background: #ad540a;
          color: white;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .warning-msg {
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

        #nade-actions {
          grid-area: actions;
        }

        .nade-action {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #nade-page-grid {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
          grid-area: main;
          display: grid;
          grid-template-columns: 1fr 1fr 160px;
          grid-template-areas:
            "title title title"
            "warning warning warning"
            "video video video"
            "meta meta meta"
            "info info actions"
            "ad ad ad"
            "comments comments .";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          width: 100%;
        }

        #placement {
          grid-area: ad;
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
          background: ${colors.DP01};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          display: flex;
          align-items: center;
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

        @media only screen and (max-width: 800px) {
          #nade-page-grid {
            grid-template-columns: 1fr 200px 1fr;
            grid-template-areas:
              "title title title"
              "warning warning warning"
              "video video video"
              "meta meta meta"
              "ad ad ad"
              "info info info"
              "actions actions actions"
              "comments comments comments"
              "misc misc misc";
          }
        }
      `}</style>
    </>
  );
});

function addslashes(str: string) {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}
