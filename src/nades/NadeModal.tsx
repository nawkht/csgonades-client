import { FC, useState, useEffect, memo } from "react";
import { NadeApi } from "../api/NadeApi";
import { Nade } from "../models/Nade/Nade";
import { useNadeModal } from "../store/MapStore/hooks/useNadeModal";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeModalPage } from "./NadeModalPage";
import { AdUnit } from "../common/adunits/AdUnit";

export const NadeModal: FC = memo(() => {
  const { colors } = useTheme();
  const { nadeForModal, clearNadeForModal } = useNadeModal();
  const [nade, setNade] = useState<Nade | null>(null);

  useEffect(() => {
    if (nadeForModal) {
      (async () => {
        const result = await NadeApi.byId(nadeForModal.id);
        if (result.isOk()) {
          setNade(result.value);
        }
      })();
    } else {
      setNade(null);
    }
  }, [nadeForModal]);

  function onDismiss() {
    clearNadeForModal();
  }

  if (!nadeForModal) {
    return null;
  }

  return (
    <>
      <div id="nade-modal" onClick={onDismiss}>
        <div id="close-wrap">
          <div id="nade-modal-close">
            <FaTimes />
          </div>
        </div>

        <div id="ph">
          <AdUnit tagType="728x90" modalTop />
        </div>

        <div id="center">
          <div id="nade-page-content" onClick={(e) => e.stopPropagation()}>
            <NadeModalPage nadeLight={nadeForModal} nade={nade} />
          </div>
        </div>
      </div>
      <style jsx>{`
        #nade-modal {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.8);
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            "ph ph ph"
            ". md close";
        }

        #center {
          grid-area: md;
          width: 1000px;
          margin-top: ${Dimensions.GUTTER_SIZE * 1.5}px;
        }

        #ph {
          grid-area: ph;
        }

        #close-wrap {
          margin-top: ${Dimensions.GUTTER_SIZE * 1.5}px;
          margin-right: ${Dimensions.GUTTER_SIZE * 1.5}px;
          grid-area: close;
          justify-self: end;
        }

        #nade-modal-close {
          position: sticky;
          top: ${Dimensions.GUTTER_SIZE * 1.5}px;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
        }

        #nade-modal-close:hover {
          color: rgba(255, 255, 255, 1);
        }

        #nade-page-content {
          background: ${colors.DP00};
          margin-bottom: 100px;
          border-radius: 5px;
          min-height: calc(100vh - ${Dimensions.GUTTER_SIZE * 1.5}px);
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media only screen and (max-width: 1200px) {
          #center {
            width: 80vw;
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
