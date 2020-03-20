import { FC, memo, useState, useEffect } from "react";
import { useAnalytics } from "../../utils/Analytics";
import { useRouter } from "next/router";

type Props = {};

const START_DELAY = 2;

export const AdBlockNotice: FC<Props> = memo(({}) => {
  const { event } = useAnalytics();
  const [hasDisplayed, setHasDisplayed] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    let delayedCheck: NodeJS.Timer | undefined;

    if (hasDisplayed) {
      return;
    }

    if (pathname.includes("map") || pathname.includes("nade")) {
      delayedCheck = setTimeout(() => {
        if (typeof ezstandalone === "undefined") {
          setShowNotice(true);
          setHasDisplayed(true);
        }
      }, 15000);
    }

    return () => {
      if (delayedCheck) {
        clearTimeout(delayedCheck);
      }
    };
  }, [pathname, hasDisplayed]);

  function onDismiss() {
    event({
      category: "AdBlockCheck",
      action: "Dismiss clicked",
    });
    setShowNotice(false);
  }

  function onOk() {
    event({
      category: "AdBlockCheck",
      action: "Ok clicked",
    });
    setShowNotice(false);
  }

  if (!showNotice) {
    return null;
  }

  return (
    <>
      <div className="notice-container">
        <div className="elements">
          <div className="message">
            <p>
              Please don&apos;t make me <strong>ECO</strong> next round!
              Whitelist this site from <strong>AdBlock</strong> ❤️
            </p>
            <div className="buttons">
              <button className="ok-btn" onClick={onDismiss}>
                Got it. Force buy!
              </button>
              <button className="dismiss-btn" onClick={onOk}>
                Dismiss
              </button>
            </div>
          </div>
          <div className="player">
            <img src="/blocknotice/player.svg" />
          </div>
          <div className="tear tear-1">
            <img src="/blocknotice/tear.svg" />
          </div>
          <div className="tear tear-2">
            <img src="/blocknotice/tear.svg" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .notice-container {
          position: fixed;
          top: calc(50% - 150px);
          right: 0;
          width: 400px;
          height: 300px;
          color: white;
          z-index: 999;
          transform: translateX(100%);
          animation-name: show-notice;
          animation-duration: 2s;
          animation-fill-mode: forwards;
          animation-delay: ${START_DELAY}s;
        }

        .buttons {
          display: flex;
        }

        .dismiss-btn,
        .ok-btn {
          border: none;
          display: block;
          border: 1px solid #0c8a34;
          color: #0c8a34;
          padding: 10px;
          border-radius: 5px;
          outline: none;
          background: transparent;
          cursor: pointer;
        }

        .dismiss-btn {
          border: 1px solid #bbb;
          color: #bbb;
          margin-left: 10px;
        }

        .tear {
          position: absolute;
          right: 47px;
          top: 135px;
          transform: scale(0);
          animation-name: tear-animate;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          opacity: 0;
        }

        .player {
          width: 200px;
          height: 200px;
          position: absolute;
          top: 20px;
          right: -40px;
          transform: rotate(-15deg);
        }

        .player img {
          max-width: 100%;
        }

        .message {
          background: #fff;
          color: #222;
          position: absolute;
          top: -25px;
          right: 100px;
          padding: 20px;
          padding-right: 50px;
          border-radius: 20px;
          border: 1px solid #bbb;
          opacity: 0;
          animation-name: show-text;
          animation-duration: 0.3s;
          animation-fill-mode: forwards;
          animation-delay: ${START_DELAY + 2}s;
        }

        .elements {
          position: relative;
        }

        @keyframes tear-animate {
          0% {
            transform: scale(0) translateY(0px);
            opacity: 0;
          }

          50% {
            transform: scale(0.6) translateY(50px);
            opacity: 1;
          }

          95% {
            opacity: 0.01;
          }

          100% {
            transform: scale(0) translateY(100px);
            opacity: 0;
          }
        }

        @keyframes show-notice {
          0% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(20px);
          }
        }

        @keyframes show-text {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
});
