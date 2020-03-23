import { FC, memo, useState, useEffect } from "react";
import { useAnalytics } from "../../utils/Analytics";
import { useRouter } from "next/router";

type Props = {};

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
      category: "Ad",
      action: "Notice Dismiss clicked",
    });
    setShowNotice(false);
  }

  function onOk() {
    event({
      category: "Ad",
      action: "Notice Ok clicked",
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
          <div className="player">
            <img className="player-img" src="/blocknotice/player.svg" />
            <div className="tear tear-1">
              <img className="tear-img" src="/blocknotice/tear.svg" />
            </div>
          </div>

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
        </div>
      </div>
      <style jsx>{`
        .notice-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-content: center;
          justify-content: space-around;
          z-index: 900;
          background: rgba(0, 0, 0, 0.95);
          animation-name: show-notice;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .elements {
          align-self: center;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          top: 115px;
          left: 69px;
          transform: scale(0);
          opacity: 0;
          animation-name: tear-animate;
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }

        .player {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .player .player-img {
          max-width: 100%;
          transform: rotate(50deg);
        }

        .message {
          z-index: 999;
          position: relative;
          top: -40px;
          background: #fff;
          color: #222;
          padding: 20px;
          max-width: 400px;
          border-radius: 20px;
          border: 1px solid #bbb;
        }

        @keyframes tear-animate {
          from {
            transform: scale(0) translateY(0px);
            opacity: 0.3;
          }

          50% {
            opacity: 1;
          }

          to {
            transform: scale(0.4) translateY(75px);
            opacity: 0;
          }
        }

        @keyframes show-notice {
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
