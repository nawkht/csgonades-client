import { FC, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../common/layout/Layout2";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps/components/SignInWarning";
import { mapString } from "../models/Nade/CsGoMap";
import { Nade } from "../models/Nade/Nade";
import { nadeTypeString } from "../models/Nade/NadeType";
import { useCanEditNade, useRegisterView } from "../store/NadeStore/NadeHooks";
import { AdminEditor } from "./admineditor/AdminEditor";
import { FavoriteButton } from "./components/FavoriteButton";
import { MapPositionEditor } from "./components/MapPositionEditor";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeInfo } from "./components/NadeInfo";
import { NadeStatus } from "./components/NadeStatus";
import { NadeTitle } from "./components/NadeTitle";
import { SimilarNades } from "./components/SimilarNades";
import { DecriptionEditor } from "./editcontainers/DescriptionEditor";
import { MetaEditor } from "./editcontainers/MetaEditor";
import { TitleEditor } from "./editcontainers/TitleEditor";

type Props = {
  nade: Nade;
};

export const NadePage: FC<Props> = ({ nade }) => {
  const registerView = useRegisterView();
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
          <div className="nade-page-header-placeholder">
            <EzoicPlaceHolder id={108} />
          </div>
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
              <div className="action-container">
                <div className="empty-container"></div>
                <div className="nade-actions">
                  <FavoriteButton
                    showSignInWarning={() => setShowSignInWarning(true)}
                    nade={nade}
                  />
                </div>
              </div>

              <NadeInfo
                nade={nade}
                onEditTitle={() => setEditDescisisble(true)}
                onEditMeta={() => setEditMetaVisible(true)}
              />

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
          margin-top: 10px;
          margin-bottom: 10px;
          height: 50px;
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

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nade-page {
          }

          .nade-page-aside,
          .nade-page-aside2 {
            display: none;
          }

          .similar-nades {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      `}</style>
    </>
  );
};
