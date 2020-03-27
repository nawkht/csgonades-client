import { FC, memo } from "react";
import { FaDiscord, FaPaypal } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";

export const FrontpageActions: FC = memo(({}) => {
  return (
    <>
      <div className="actions-wrapper">
        <a
          href="https://discord.gg/010h0KFCBNASyMUKv"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action discord">
            <div className="discord-msg">
              Join us on <span className="fat">Discord</span>
            </div>
            <div className="sub-msg">One of us! One of us! ..One of us!</div>
            <div className="discord-logo">
              <FaDiscord />
            </div>
          </div>
        </a>

        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action paypal">
            <p className="paypal-msg">
              Consider donating with <span>Paypal</span>
            </p>

            <p className="sub-msg">
              *glub* I&apos;m running out of energy drink&apos;s.
            </p>

            <div className="paypal-logo">
              <FaPaypal />
            </div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .actions-wrapper {
          width: 100%;
        }

        .action {
          padding: 20px;
          color: white;
          border-radius: 5px;
          transition: transform 0.2s;
          margin-bottom: 30px;
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
