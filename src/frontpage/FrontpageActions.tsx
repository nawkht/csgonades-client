import { FC, memo } from "react";
import { FaPaypal } from "react-icons/fa";
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
      <div className="actions-wrapper">
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={onDonateClick}
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
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .action {
          padding: 20px;
          color: white;
          border-radius: 5px;
          transition: transform 0.2s;
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
