import { FC, memo, useEffect, useState } from "react";
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
import { NadeTitle, nadeTitleBuilder } from "./components/NadeTitle";
import { SEO } from "../layout/SEO2";
import { NadeInfoContainer } from "./NadeInfoContainer";
import { NadeActions } from "./NadeActions";
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
          <EzoicPlaceHolder id={162} />
        </aside>
        <aside id="sidebar-right">
          <EzoicPlaceHolder id={161} />
        </aside>
        <div id="nade-social">
          <NadeShareActions
            title={nadeTitleBuilder(nade?.type, nade?.title, nade.map)}
            visisble={nade?.status === "accepted"}
            url={`/nades/${nade?.slug || nade?.id}`}
            image={nade?.images.thumbnailUrl}
          />
        </div>

        <div id="nade-page-main">
          <NadeVideoContainer nade={nade} />

          <NadeActions
            nade={nade}
            onShowSignInWarning={() => setShowSignInWarning(true)}
          />

          <EzoicPlaceHolder id={156} />

          <NadeInfoContainer
            nade={nade}
            onEditDescription={() => setEditDescisisble(true)}
            onEditMeta={() => setEditMetaVisible(true)}
          />
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
          grid-template-columns: 300px 1fr 300px;
          grid-template-areas:
            ". social ."
            "adleft main adright";
          max-width: 100%;
          grid-column-gap: ${Dimensions.GUTTER_SIZE};
          padding-top: 30px;
          max-width: calc((16 / 9 * 600px) + 300px + 300px + 60px);
          margin: 0 auto;
        }

        #nade-social {
          grid-area: social;
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
          display: flex;
          justify-content: space-around;
        }

        .ad-bottom {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
        }

        .title {
          padding-top: 50px;
        }

        @media only screen and (max-width: 1400px) {
          #nade-page-grid {
            grid-template-columns: 160px 1fr 160px;
            max-width: calc((16 / 9 * 600px) + 160px + 160px + 60px);
          }
        }

        @media only screen and (max-width: 1000px) {
          #nade-page-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "social"
              "main";
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
