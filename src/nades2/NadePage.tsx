import { FC, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Layout2 } from "../common/layout/Layout2";
import { ResponsiveVideo } from "../common/ResponsiveVideo/ResponsiveVideo";
import { mapString } from "../models/Nade/CsGoMap";
import { Nade } from "../models/Nade/Nade";
import { nadeTypeString } from "../models/Nade/NadeType";
import { SimilarNades } from "../nades/SimilarNades";
import { useRegisterView } from "../store/NadeStore/NadeHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { FavoriteButton } from "./components/FavoriteButton";
import { NadeBreadcrumb } from "./components/NadeBreadcrumb";
import { NadeInfo } from "./components/NadeInfo";
import { NadeTitle } from "./components/NadeTitle";

type Props = {
  nade: Nade;
};

export const NadePage: FC<Props> = ({ nade }) => {
  const registerView = useRegisterView();
  const { colors } = useTheme();

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
        <NadeBreadcrumb nade={nade} />
        <NadeTitle title={nade.title} map={nade.map} type={nade.type} />
        <div className="nade-page">
          <aside className="nade-page-aside"></aside>
          <div className="nade-page-content">
            <ResponsiveVideo
              key={nade.id}
              hdUrL={nade.gfycat.largeVideoUrl}
              sdUrl={nade.gfycat.smallVideoUrl}
              hdUrlWebm={nade.gfycat.largeVideoWebm}
              poster={nade.images.thumbnailUrl}
              controls={isMobile ? "mobile" : "desktop"}
            />
            <FavoriteButton nade={nade} />
            <NadeInfo nade={nade} />
            <div className="similar-nades">
              <SimilarNades nade={nade} />
            </div>
          </div>
          <aside className="nade-page-aside2" key={nade.id}></aside>
        </div>
      </Layout2>
      <style jsx>{`
        .nade-page {
          margin: 0 auto;
          max-width: calc(1000px + 160px + 160px + 40px + 40px);
          display: flex;
          padding-bottom: 50px;
          min-height: 85vh;
        }

        .nade-page-aside {
          margin-right: 40px;
          width: 160px;
        }

        .nade-page-aside2 {
          margin-left: 40px;
          width: 160px;
        }

        .nade-page-content {
          flex: 1;
          max-width: 1000px;
        }
      `}</style>
    </>
  );
};
