import React, { FC } from "react";

export const Amazon240Monitor: FC = () => {
  return (
    <>
      <iframe
        className="a-af"
        frameBorder={0}
        scrolling="no"
        src="/statichtml/aff-monitor240.html"
      ></iframe>

      <style jsx>{`
        .a-af {
          width: 100%;
          height: 500px;
          border: none;
        }
      `}</style>
    </>
  );
};
