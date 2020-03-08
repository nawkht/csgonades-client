import { FC } from "react";

type Props = {};

export const Notice: FC<Props> = ({}) => {
  return (
    <>
      <div className="notice">
        <div className="notice-msg">
          We are currently expecting some issues with our Content Delivery
          Service. Please come back later if images are not loading. The fixes
          will take a while to take effect.
        </div>
      </div>
      <style jsx>{`
        .notice {
          background: #821109;
        }
        .notice-msg {
          color: white;
          padding: 15px;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
