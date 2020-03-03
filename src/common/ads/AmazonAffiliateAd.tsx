// @ts-ignore
import React, { FC } from "react";

type Props = {
  height?: number;
};

const AmazonAffiliateAdd: FC<Props> = ({ height }) => {
  return (
    <>
      <iframe
        className="a-af"
        frameBorder={0}
        scrolling="no"
        src="/statichtml/aff-am.html"
      ></iframe>

      <style jsx>{`
        .a-af {
          width: 100%;
          height: ${height ? height : 500}px;
          border: none;
        }
      `}</style>
    </>
  );
};

export default AmazonAffiliateAdd;
