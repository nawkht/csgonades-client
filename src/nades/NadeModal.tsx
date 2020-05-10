import { FC, useState, useEffect, memo } from "react";
import { NadeApi } from "../api/NadeApi";
import { Nade } from "../models/Nade/Nade";
import { useNadeModal } from "../store/MapStore/hooks/useNadeModal";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeModalPage } from "./NadeModalPage";
import { useAnalytics } from "../utils/Analytics";
import { AdUnit } from "../common/adunits/AdUnit";

export const NadeModal: FC = memo(() => {
  const [hidden, setHidden] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);
  const { pageView } = useAnalytics();
  const { colors } = useTheme();
  const { nadeForModal, clearNadeForModal } = useNadeModal();
  const [prevPath, setPrevPath] = useState<string | undefined>();
  const [nade, setNade] = useState<Nade | null>(null);

  useEffect(() => {
    if (nadeForModal) {
      setHidden(false);
      setHasOpened(true);
      const curPath = window.location.pathname;
      setPrevPath(curPath);
      const nadePath = `/nades/${nadeForModal.slug || nadeForModal.id}`;
      window.history.pushState("", "", nadePath);
      (async () => {
        const result = await NadeApi.byId(nadeForModal.id);
        if (result.isOk()) {
          setNade(result.value);
        }
      })();
    } else {
      setTimeout(() => {
        setHidden(true);
        setNade(null);
      }, 300);
    }
  }, [nadeForModal]);

  // Restore path url when user dismisses
  function onDismiss() {
    clearNadeForModal();
    if (prevPath) {
      window.history.pushState("", "", prevPath);
      pageView({
        path: prevPath,
      });
    }
  }

  return (
    <>
      <div
        className={!!nadeForModal ? "nade-modal visible" : "nade-modal"}
        onClick={onDismiss}
      >
        <div id="nade-modal-content">
          <div id="close-wrap">
            <div id="nade-modal-close">
              <FaTimes />
            </div>
          </div>
          <div id="ph">{hasOpened && <AdUnit tagType="160x600" />}</div>

          <div id="center">
            {nadeForModal && (
              <div id="nade-page-content" onClick={(e) => e.stopPropagation()}>
                <NadeModalPage nadeLight={nadeForModal} nade={nade} />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .nade-modal {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.8);
          overflow-y: auto;
          padding-top: ${Dimensions.GUTTER_SIZE * 1.5}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE * 1.5}px;
          display: ${hidden ? "none" : "block"};
          opacity: 0;
          transition: opacity 0.2s;
        }

        .visible {
          opacity: 1;
        }

        #nade-modal-content {
          margin: 0 auto;
          width: calc(100vw - ${Dimensions.GUTTER_SIZE}px);
          display: grid;
          grid-template-columns: 190px 1fr 190px;
          grid-template-areas:
            "ph md close"
            "ph md close";
        }

        #center {
          grid-area: md;
        }

        #ph {
          grid-area: ph;
        }

        #close-wrap {
          grid-area: close;
          justify-self: end;
          padding-right: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        #nade-modal-close {
          position: sticky;
          top: 0;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
        }

        #nade-modal-close:hover {
          color: rgba(255, 255, 255, 1);
        }

        #nade-page-content {
          background: ${colors.DP00};
          border-radius: 5px;
          min-height: calc(100vh - ${Dimensions.GUTTER_SIZE * 1.5}px);
          max-width: ${Dimensions.PAGE_WIDTH}px;
          margin: 0 auto;
        }

        #nade-modal::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        #nade-modal::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        #nade-modal/* Handle */
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.6);
        }

        /* Handle on hover */
        #nade-modal::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        @media only screen and (max-width: 1200px) {
          #nade-modal-content {
            grid-template-columns: 60px 1fr 60px;
            grid-template-areas:
              "ph md close"
              "ph md close";
          }

          #ph {
            display: none;
          }
        }
      `}</style>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
});
