import { FC, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { EzoicLoader } from "../common/ezoicLoader/EzoicLoader";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../common/layout/Layout2";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps2/components/SignInWarning";
import { mapString } from "../models/Nade/CsGoMap";
import { Nade } from "../models/Nade/Nade";
import { nadeTypeString } from "../models/Nade/NadeType";
import { AdminEditor } from "../nades/AdminEditor/AdminEditor";
import { MapPositionEditor } from "../nades/MapPositionEditor/MapPositionEditor";
import { NadeStatus } from "../nades/NadeStatus/NadeStatus";
import { SimilarNades } from "../nades/SimilarNades";
import { useCanEditNade, useRegisterView } from "../store/NadeStore/NadeHooks";
import { FavoriteButton } from "./components/FavoriteButton";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeInfo } from "./components/NadeInfo";
import { NadeTitle } from "./components/NadeTitle";
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
        <EzoicLoader codes={[108, 109]} />
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
            <aside className="nade-page-aside"></aside>
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

        .nade-page-header-placeholder {
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .nade-page {
          margin: 0 auto;
          max-width: calc(1000px + 300px + 300px + 20px + 20px);
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
          margin-right: 20px;
          width: 300px;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .nade-page-aside2 {
          margin-left: 20px;
          width: 300px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
        }

        .nade-page-content {
          flex: 1;
          max-width: 1000px;
        }

        .action-container {
          margin-top: 20px;
          margin-bottom: 20px;
          display: flex;
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
        }
      `}</style>
    </>
  );
};
