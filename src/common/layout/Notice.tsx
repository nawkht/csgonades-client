import { FC } from "react";

type Props = {};

export const Notice: FC<Props> = ({}) => {
  return (
    <>
      <div className="notice">
        <div className="notice-msg">
          <p>
            We are currently moving DNS.
            <br />
            The website might not be working as intended during this period.
          </p>
        </div>
      </div>
      <style jsx>{`
        .notice {
          background: #821109;
        }
        .notice-msg p {
          color: white;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-left: 40px;
          margin-right: 40px;
          max-width: 1200px;
          margin: 0 auto;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
