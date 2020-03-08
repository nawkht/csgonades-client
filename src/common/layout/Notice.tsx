import { FC } from "react";

type Props = {};

export const Notice: FC<Props> = ({}) => {
  return (
    <>
      <div className="notice">
        <div className="notice-msg">
          We are currently expecting some issues with our Content Delivery
          Service. If images are not loading try navigating to a new site and it
          might fix it.
          <br />
          We are working on a fix but it might take a while to take effect.
          <br />
        </div>
      </div>
      <style jsx>{`
        .notice {
          background: #821109;
        }
        .notice-msg {
          color: white;
          padding: 10px;
          max-width: 600px;
          margin: 0 auto;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </>
  );
};
