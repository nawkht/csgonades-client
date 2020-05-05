import { FC } from "react";
import { FaDiscord } from "react-icons/fa";

type Props = {};

export const FooterDiscord: FC<Props> = ({}) => {
  return (
    <>
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
      <style jsx>{`
        .action {
          padding: 20px;
          color: white;
          border-radius: 5px;
          transition: transform 0.2s;
          min-height: 200px;
          background: #7289da;
          transition: background 0.1s;
          width: 200px;
        }

        .action:hover {
          background: #5c70b8;
        }

        .discord-msg {
          margin-bottom: 10px;
          font-size: 18px;
          line-height: 28px;
        }

        .sub-msg {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 50px;
          opacity: 0.2;
          color: #fff;
        }
      `}</style>
    </>
  );
};
