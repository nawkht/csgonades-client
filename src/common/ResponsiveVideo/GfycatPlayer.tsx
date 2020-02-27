import { FC } from "react";

type Props = {
  gfyId: string;
};

export const GfycatPlayer: FC<Props> = ({ gfyId }) => {
  return (
    <>
      <div>
        <div className="wrapper">
          <iframe
            className="gfy-iframe"
            src={`https://gfycat.com/ifr/${gfyId}`}
            frameBorder={0}
            allowFullScreen
            scrolling="no"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 100%;
          position: relative;
          padding-bottom: 56.25%;
          border: 1px solid red;
        }

        .gfy-iframe {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
};
