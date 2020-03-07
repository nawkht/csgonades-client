import { FC } from "react";
import { FaDiscord, FaPaypal } from "react-icons/fa";

type Props = {};

export const FrontpageActions: FC<Props> = ({}) => {
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
              Join us
              <br />
              on <span className="fat">Discord</span>
            </div>
            <div className="discord-sub-msg">
              One of us!
              <br />
              <span className="invis">__</span>One of us!
              <br />
              <span className="invis">___</span>...One of us!
            </div>
            <div className="discord-logo">
              <FaDiscord />
            </div>
          </div>
        </a>

        <div className="action paypal">
          <p className="paypal-msg">
            Consider donating
            <br />
            through <span>Paypal</span>
          </p>

          <p className="paypal-sub-msg">
            <em>*glub* *glub*</em>
            <br />
            I&apos;m running out of energy drink&apos;s.
          </p>

          <div className="paypal-logo">
            <FaPaypal />
          </div>
        </div>
      </div>
      <style jsx>{`
        .actions-wrapper {
          margin: 0 auto;
          max-width: 700px;
          margin-bottom: 100px;
          display: flex;
          justify-content: space-between;
        }

        .action {
          padding: 40px;
          width: 300px;
          color: white;
          border-radius: 5px;
        }

        .discord-msg {
          margin-bottom: 20px;
          font-size: 20px;
          line-height: 28px;
        }

        .discord-sub-msg {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .discord {
          background: #7289da;
          position: relative;
          min-height: 220px;
        }

        .discord-logo {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 100px;
          opacity: 0.2;
          color: #fff;
        }

        .paypal {
          position: relative;
          background: #00659d;
          min-height: 220px;
        }

        .paypal-logo {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 100px;
          opacity: 0.2;
          color: #fff;
        }

        .paypal-msg {
          font-size: 20px;
          line-height: 28px;
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
      `}</style>
    </>
  );
};
