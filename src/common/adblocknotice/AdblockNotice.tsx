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
      }, 25 * 1000);
    }

    return () => {
      if (delayedCheck) {
        clearTimeout(delayedCheck);
      }
    };
  }, [pathname, hasDisplayed]);

  function onDismiss() {
    event({
      category: "Ads",
      action: "Notice Dismiss clicked",
    });
    setShowNotice(false);
  }

  function onOk() {
    event({
      category: "Ads",
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
              Don&apos;t make me <strong>ECO</strong> this round!
              <br />
              Whitelist this site from <strong>AdBlock</strong> 👊
            </p>
            <div className="buttons">
              <button className="ok-btn" onClick={onDismiss}>
                Force buy! I will!
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
          z-index: 998;
          background: rgba(0, 0, 0, 0.5);
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
          white-space: nowrap;
        }

        .dismiss-btn,
        .ok-btn {
          border: none;
          display: block;
          border: none;
          background: #0aa6d1;
          color: #fff;
          padding: 10px;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          flex: 1;
          margin-right: 15px;
          font-size: 18px;
        }

        .dismiss-btn {
          border: 1px solid #bbb;
          color: #bbb;
          margin-right: 0;
          background: transparent;
        }

        .tear {
          position: absolute;
          top: 110px;
          left: 69px;
          transform: scale(0);
          opacity: 0;
          animation-name: tear-animate;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
        }

        .player {
          position: relative;
          width: 200px;
          height: 200px;
          transform: translateY(30px) scale(0.8);
          animation-name: player-appear;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          animation-delay: 0.25s;
        }

        .player .player-img {
          max-width: 100%;
          transform: rotate(50deg);
        }

        .message {
          z-index: 999;
          position: relative;
          top: -150px;
          background: rgba(255, 255, 255, 1);
          color: #222;
          padding: 20px;
          max-width: 400px;
          border-radius: 5px;
          text-align: center;
          font-size: 18px;
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
            transform: scale(0.55) translateY(25px);
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

        @keyframes player-appear {
          from {
            transform: translateY(30px) scale(0.8);
          }
          to {
            transform: translateY(-100px) scale(1);
          }
        }
      `}</style>
    </>
  );
});
