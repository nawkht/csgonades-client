import { FC, memo } from "react";
import { FaPaypal, FaDiscord } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useAnalytics } from "../utils/Analytics";

export const FrontpageActions: FC = memo(({}) => {
  const { event } = useAnalytics();

  function onDonateClick() {
    event({
      category: "Front Page Action",
      action: "Paypal Donate",
    });
  }

  return (
    <>
      <div className="front-page-actions">
        <div className="actions-wrapper">
          <a
            href="https://discord.gg/010h0KFCBNASyMUKv"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <div className="action discord">
              <p className="discord-msg">
                Join us on <b>Discord</b>
              </p>

              <p className="sub-msg">One of us... one of us!</p>

              <div className="discord-logo">
                <FaDiscord />
              </div>
            </div>
          </a>
        </div>

        <div className="actions-wrapper">
          <a
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={onDonateClick}
          >
            <div className="action paypal">
              <p className="paypal-msg">
                Support me on <span>Paypal</span>
              </p>

              <p className="sub-msg">
                Refill my fuel tank <span className="emoji">🥤</span>
              </p>

              <div className="paypal-logo">
                <FaPaypal />
              </div>
            </div>
          </a>
        </div>
      </div>
      <style jsx>{`
        .front-page-actions {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .emoji {
          font-size: 2.5em;
          position: relative;
          top: 5px;
          left: -3px;
        }

        .actions-wrapper {
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-top: 0;
          flex: 1;
          min-width: 300px;
        }

        .action {
          padding: 20px;
          color: white;
          border-radius: 5px;
          transition: transform 0.2s;
          min-height: 100px;
        }

        .action:hover {
          transform: scale(1.02);
        }

        .discord-msg,
        .paypal-msg {
          margin-bottom: 10px;
          font-size: 18px;
          line-height: 28px;
        }

        .sub-msg {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .discord {
          background: #7289da;
          position: relative;
        }

        .discord-logo,
        .paypal-logo {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 50px;
          opacity: 0.2;
          color: #fff;
        }

        .paypal {
          position: relative;
          background: #00659d;
        }

        .paypal-msg span {
          font-weight: 400;
        }

        .paypal-sub-msg {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .fat {
          font-weight: 400;
        }

        .invis {
          opacity: 0;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .actions-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
});

export const DiscordJoinAction = () => {
  return (
    <>
      <div className="actions-wrapper">
        <a
          href="https://discord.gg/010h0KFCBNASyMUKv"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action">
            <div className="discord-msg">
              Join us on <b>Discord</b>
            </div>
            <div className="discord-logo">
              <FaDiscord />
            </div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .actions-wrapper {
          width: 100%;
          margin-top: 10px;
        }

        .action {
          display: flex;
          padding: 10px 20px;
          color: white;
          justify-content: space-between;
          align-items: center;
          background: #7289da;
        }

        .action:hover {
          background: #6276bd;
        }

        .discord-msg {
          font-size: 18px;
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          font-size: 40px;
          opacity: 0.2;
          color: #fff;
        }
      `}</style>
    </>
  );
};
