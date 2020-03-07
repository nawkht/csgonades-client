import React, { FC } from "react";

const AmazonMice: FC = () => {
  return (
    <>
      <iframe
        className="a-af"
        frameBorder={0}
        scrolling="no"
        src="/statichtml/aff-mouse.html"
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

export default AmazonMice;
